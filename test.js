// const currentTime = new Date();
// const minutes = currentTime.getMinutes();

// const result = minutes < 5 ? performOperation()

// for otp validation less than 5 minutes
const currentTime = new Date();
const timeElapse = currentTime.getMinutes();

const expiryTime = timeElapse < 5;

if (currentTime < expiryTime) {
  console.log("great");
} else {
  console.log("bad");
}
