const Employee = require('../models/employeeModel');
const bcrypt = require('bcrypt');
const generator = require('generate-password');
const jwt = require('../config/genrateToken');


exports.addEmployee = async(req, res)=>{

    try {
        
        const { employeeId, firstName, lastName, email, number, position, joiningDate } = req.body;

        // Check if the employee already exists
        const existingEmployee = await Employee.findOne({ email });
    
        if (existingEmployee) {
          return res.status(400).json({ message: "Employee with this email already exists" });
        }
    
        // Generate a random password
        const passcode = generator.generate({
          length: 15, 
          numbers: true
        });
        const password = passcode.toString();
    
        // Hash the generated password
        const hashPassword = await bcrypt.hash(password, 10);
    
        // Create a new Employee document
        const newEmployee = new Employee({
          employeeId,
          firstName,
          lastName,
          email,
          number,
          position,
          joiningDate,
          password: hashPassword
        });
    
        // Save the new employee to the database
        await newEmployee.save();
    
        return res.status(200).json({ message: 'Employee added successfully', employee: newEmployee });
    
    } catch (error) {
        res.status(500).send("server error "  + error);
    }
}


exports.employeeLogin = async(req, res)=>{

 
    try {
        const { email, password } = req.body;
    
        // Find employee by email
        const employee = await Employee.findOne({ email });
    
        // Check if employee exists
        if (!employee) {
          return res.status(400).json({ msg: "Employee details not found" });
        }
    
        // Compare passwords
        const passwordMatch = await bcrypt.compare(password, employee.password);
    
        if (!passwordMatch) {
          return res.status(400).json({ msg: "Incorrect password" });
        }
    
        // Login successful

        token = jwt.generateToken();

        return res.status(200).json({
          success: "employee logged In",
          Token: token
        });
    
      } catch (error) {
        console.error("Error in employeeLogin:", error.message);
        return res.status(500).json({ msg: "Server error" });
      }
}


