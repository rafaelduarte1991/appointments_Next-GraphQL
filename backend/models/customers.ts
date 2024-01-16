import mongoose, {Schema} from "mongoose"

const CustomerSchema = new Schema(
  {
    name: String,
    phone: String,
    address: String,
    identificationNumber: String,
  }
)

const Customers = mongoose.models.Coins || mongoose.model("customers", CustomerSchema);

export default Customers;