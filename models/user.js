//Import Module's
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			trim: true,
			required: true
		},
		email: {
			type: String,
			trim: true,
			unique: true,
			required: true
		},
		password: {
			type: String,
			required: true
		},
		jwtToken: {
			type: String,
		},
		phoneNumber:{
			type: String,
			required:true
		},
		isActive: {
			type: Boolean,
			default: true,
		},
		isDeleted: {
			type: Boolean,
			default: false,
		},
	},
	{timestamps: true},
);

userSchema.pre("save", function (next) {
	const user = this;
	if (user.password) {
		// Hashing the Password .
		bcrypt.hash(user.password, 10, function (err, hash) {
			if (err) {
				return res.status(400).json({
					error: true,
					message: `Error in creating the Account`,
				});
			}
			user.password = hash;
			next();
		});
	} else next();
});

// Export the Schema with the name User.
module.exports = mongoose.model("User", userSchema);
