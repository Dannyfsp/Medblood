const prisma = require("../config/prisma");

exports.make_donation = async (req, res) => {
  const { id } = req.user;
  const { blood_group, donation_date, amount, last_donation } = req.body;
  try {
    const user = await prisma.donor.findUnique({
      where: { id: Number(id) },
    });

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
    return res.status(401).json({ status: "Failed", error: error.message });
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
    return res.status(401).json({ status: "Failed", error: error.message });
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
    return res.status(401).json({ status: "Failed", error: error.message });
  }
};

exports.update_donation = async (req, res) => {
  const { id } = req.user;
  const { donation_id } = req.params;
  const { blood_group, donation_date, amount, last_donation } = req.body;
  try {
    const user = await prisma.donor.findUnique({
      where: { id: Number(id) },
    });
    const donation = await prisma.donation.findFirst({
      where: { donor_id: Number(id) },
    });
    if (!donation) {
      return res.status(400).json({ message: "No donation offer found" });
    }
    const update_info = await prisma.donor.update({
      where: { id: Number(id) },
      data: {
        blood_group: blood_group,
        donation: {
          update: {
            where: { id: Number(donation_id) },
            data: {
              blood_group: blood_group,
              donation_date: donation_date,
              amount: amount,
              last_donation: last_donation,
            },
          },
        },
      },
      select: { id: true, donation: true },
    });

    console.log(donation.id);
    return res.status(200).json({
      status: "Success",
      message: "donation offer updated successfully",
      user_id: user.id,
      update_info,
    });
  } catch (error) {
    return res.status(500).json({ status: "Failed", error: error.message });
  }
};

exports.delete_donation = async (req, res) => {
  const { id } = req.user;
  const { donation_id } = req.params;
  try {
    const donation = await prisma.donation.findFirst({
      where: { donor_id: Number(id) },
    });
    if (!donation) {
      return res.status(400).json({ message: "No donation offer found" });
    }
    await prisma.donation.delete({
      where: { id: Number(donation_id) },
    });

    console.log(donation.id);
    return res.status(200).json({
      status: "Success",
      message: "donation offer deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: "Failed", error: error.message });
  }
};

exports.query_blood_type = async (req, res) => {
  const { blood_group } = req.query;
  try {
    const results = await prisma.donation.findMany({
      where: { blood_group: blood_group },
      select: { blood_group: true },
    });

    if (!results) {
      return res.status(400).json({
        message: `donation with the blood group ${blood_group} does not exist`,
      });
    }
    return res.status(200).json({ status: "Success", results });
  } catch (error) {
    return res.status(500).json({ status: "Failed", error: error.message });
  }
};
