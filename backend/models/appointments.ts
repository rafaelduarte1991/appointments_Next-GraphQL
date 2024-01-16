import mongoose, {Schema} from "mongoose"

const AppointmentSchema = new Schema(
  {
    startsAt: Date,
    endsAt: Date,
    customerId: String
  }
)

const Appointment = mongoose.models.Coins || mongoose.model("Appointments",AppointmentSchema);

export default Appointment;