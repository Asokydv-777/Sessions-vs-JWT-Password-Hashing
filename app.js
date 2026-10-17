const express = require("express");
const bcrypt = require("bcryptjs");

const app = express();
app.use(express.json());

const users = [];
//yo sign up ho
app.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;

    
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password required" });
    }

    
    const existingUser = users.find((u) => u.email === email);
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    
    const newUser = { email, passwordHash };
    users.push(newUser);

    console.log("User created. Stored hash:", passwordHash);
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// yo login ho
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

   
    const user = users.find((u) => u.email === email);

    
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    
    const isValid = await bcrypt.compare(password, user.passwordHash);

    if (!isValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    
    res.json({ message: "Login successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
