import mongoose, {Schema} from "mongoose"

const appointmentSchema = new Schema(
  {
    startsAt: Date,
    endsAt: Date,
    customerId: String
  }
)

const Appointment = mongoose.models.Coins || mongoose.model("Appointment",appointmentSchema);

export default Appointment;