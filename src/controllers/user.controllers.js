const bcrypt = require("bcrypt");
const prisma = require("../config/prisma");
const send_email = require("../utils/sendMail");

exports.user_registration = async (req, res) => {
  const {
    firstname,
    lastname,
    age,
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
    const user_exist = await prisma.donor.findFirst({
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

    const user = await prisma.donor.create({
      data: {
        firstname: firstname,
        lastname: lastname,
        age: age,
        email: email,
        phone: phone,
        password: hashedpwd,
        blood_group: blood_group,
        weight: weight,
        otp_token: hash_otp,
        address: address,
        state: state,
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
    const user_otp = await prisma.donor.findUnique({
      where: { id: Number(id) },
    });
    if (!user_otp) {
      return res.status(400).json({ message: "user does not exist" });
    }

    // set expiration time to 5 minutes after creation
    const current_time = new Date();
    const expiration_time = new Date(
      user_otp.otp_date.getTime() + 5 * 60 * 1000
    );

    if (current_time > expiration_time) {
      // OTP has expired, set otpToken to empty string
      await prisma.donor.update({
        where: { id: Number(id) },
        data: { otp_token: "" },
      });
      return res.status(400).json({
        message: "OTP has expired",
      });
    }

    // check if OTP is valid
    const valid_otp = await bcrypt.compare(otp, user_otp.otp_token);
    if (!valid_otp) {
      await prisma.donor.update({
        where: { id: Number(id) },
        data: { otp_token: "" },
      });
      return res.status(400).json({
        message: "Invalid OTP",
      });
    }
    await prisma.donor.update({
      where: { id: Number(id) },
      data: { is_verified: true, otp_token: "" },
    });
    return res.status(200).json({
      status: "Success",
      message: `congratulations ${user_otp.firstname} 😊, your account has be verified.`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: "Failed", message: error.message });
  }
};
