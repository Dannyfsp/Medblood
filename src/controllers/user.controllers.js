const bcrypt = require("bcrypt");
const prisma = require("../config/prisma");
const send_email = require("../utils/sendMail");

exports.user_registration = async (req, res) => {
  const {
    firstname,
    lastname,
    email,
    phone,
    password,
    blood_group,
    weight,
    address,
    state,
  } = req.body;
  try {
    // check if user already exist in database
    const user_exist = await prisma.Person.findFirst({
      where: { email: email },
    });
    if (user_exist) {
      return res.status(400).json({
        message: "user already exist, please log in",
      });
    }

    // hash password before storing it in database
    const salt = await bcrypt.genSalt(10);
    const hashedpwd = await bcrypt.hash(password, salt);

    // created otpToken
    const generate_otp = Math.floor(100000 + Math.random() * 900000);
    const generated_otp = generate_otp.toString();

    // hash otp before saving it to database
    const hash_otp = await bcrypt.hash(generated_otp, salt);

    const user = await prisma.Donor.create({
      data: {
        firstname: firstname,
        lastname: lastname,
        email: email,
        phone: phone,
        password: hashedpwd,
        blood_group: blood_group,
        weight: weight,
        address: address,
        state: state,
      },
    });

    await prisma.otp.create({
      data: {
        otp_token: hash_otp,
        donor_id: user.id,
      },
    });

    await send_email({
      email: user.email,
      subject: "Welcome to Medblood APP",
      html: `<h1>Hi ${firstname}, we welcome you to Medblood the best blood bank App. PLease use this token: <strong>${generated_otp}</strong></h1>`,
    });
    return res.status(201).json({
      status: "Success",
      message:
        "user created successfully, please check your email for token and verify your account",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: "Failed", message: error.message });
  }
};

exports.verify_user = async (req, res) => {
  const { id } = req.params;
  const { otp } = req.body;
  try {
    const user_otp = await prisma.otp.findUnique({
      where: {
        id: Number(donor_id),
      },
    });

    if (!user_otp) {
      await prisma.otp.delete();
      return res.status(400).json({ message: "user does not exist" });
    }

    const current_time = new Date();
    const expiration_time = new Date(
      user_otp.created_at.getTime() + 5 * 60 * 1000
    ); // set expiration time to 5 minutes after creation

    if (current_time > expiration_time) {
      // OTP has expired, set otpToken to empty string
      await prisma.otp.delete();
      return res.status(400).json({
        message: "OTP has expired",
      });
    }

    // check if OTP is valid
    const valid_otp = await bcrypt.compare(otp, user_otp.otp_token);
    if (!valid_otp) {
      await prisma.otp.delete();
      return res.status(400).json({
        message: "Invalid OTP",
      });
    }
    await prisma.Donor.update({
      where: { id: Number(id) },
      data: { isVerified: true },
    });
    await prisma.otp.delete();
    return res.status(200).json({
      status: "Success",
      message: `congratulations ${user_otp.firstname} 😊, your account has be verified.`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: "Failed", message: error.message });
  }
};
