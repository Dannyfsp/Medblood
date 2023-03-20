const prisma = require("../config/prisma");

exports.make_donation = async (req, res) => {
  const { id } = req.user;
  const { bloodgroup, donation_date, amount, last_donation } = req.body;
  try {
    const user = await prisma.donor.findUnique({
      where: { id: Number(id) },
    });

    if (bloodgroup !== user.bloodgroup) {
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
        bloodgroup: bloodgroup,
        donation_date: donation_date,
        amount: amount,
        last_donation: last_donation,
        donor: { connect: { id: Number(id) } },
      },
    });
    return res.status(201).json({
      status: "Success",
      message: "donation offer created successfully",
      donation,
    });
  } catch (error) {
    return res.status(401).json({ status: "Failed", error: error.message });
  }
};

exports.get_donations = async (req, res) => {
  try {
    const donations = await prisma.donation.findMany({
      select: {
        id: true,
        bloodgroup: true,
        donation_date: true,
        amount: true,
        donor: { select: { id: true, age: true, weight: true, state: true } },
      },
    });
    return res.status(200).json({ status: "Success", donations });
  } catch (error) {
    return res.status(500).json({ status: "Failed", error: error.message });
  }
};

exports.get_donation = async (req, res) => {
  const { id } = req.user;
  try {
    const donation = await prisma.donor.findFirst({
      where: { id: Number(id) },
      select: { donation: true },
    });
    return res.status(200).json({ status: "Success", donation });
  } catch (error) {
    return res.status(500).json({ status: "Failed", error: error.message });
  }
};

exports.update_donation = async (req, res) => {
  const { id } = req.user;
  const { donation_id } = req.params;
  const { bloodgroup, donation_date, amount, last_donation } = req.body;
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
        bloodgroup: bloodgroup,
        donation: {
          update: {
            where: { id: Number(donation_id) },
            data: {
              bloodgroup: bloodgroup,
              donation_date: donation_date,
              amount: amount,
              last_donation: last_donation,
            },
          },
        },
      },
      select: { id: true, donation: true },
    });

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
  const { bloodgroup } = req.query;
  try {
    const results = await prisma.donation.findMany({
      where: {
        bloodgroup: {
          contains: bloodgroup || "",
        },
      },
      select: {
        id: true,
        bloodgroup: true,
        donation_date: true,
        amount: true,
        donor: { select: { id: true, age: true, weight: true, state: true } },
      },
    });

    if (!results) {
      return res.status(400).json({
        message: `donation with the blood group ${bloodgroup} does not exist`,
      });
    }
    return res.status(200).json({ status: "Success", results });
  } catch (error) {
    return res.status(500).json({ status: "Failed", error: error.message });
  }
};
