const prisma = require("../config/prisma");
exports.make_donation = async (req, res) => {
  const { id } = req.user;
  const { blood_group, donation_date, amount, last_donation } = req.body;
  try {
    const user = await prisma.donor.findUnique({
      where: { id: Number(id) },
    });
    if (!user) {
      return res.status(400).json({
        message: "user does not exist",
      });
    }
    if (blood_group !== user.blood_group) {
      return res.status(400).json({
        message: "Blood group must tally",
      });
    }
    const check_donation = await prisma.donation.findFirst({
      where: { donor_id: Number(id) },
    });
    if (check_donation) {
      return res
        .status(400)
        .json({ message: "You have already made a donation plans" });
    }
    const donation = await prisma.donation.create({
      data: {
        blood_group: blood_group,
        donation_date: donation_date,
        amount: amount,
        last_donation: last_donation,
        donor: { connect: { id: Number(id) } },
      },
    });
    return res.status(201).json({
      status: "Success",
      message: "donation created successfully",
      donation,
    });
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};

exports.get_donations = async (req, res) => {
  try {
    const all_donation = await prisma.donation.findMany({
      select: {
        donor: { select: { blood_group: true, age: true, weight: true } },
      },
    });
    return res.status(200).json({ status: "Success", all_donation });
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};

exports.get_donation = async (req, res) => {
  const { id } = req.user;
  try {
    const get_donation = await prisma.donor.findFirst({
      where: { id: Number(id) },
      select: { donation: true },
    });
    return res.status(200).json({ status: "Success", get_donation });
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};
