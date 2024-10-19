import token from "../config/token.js";
import serviceUsers from "../services/serviceUsers.js";

async function CreateUser(req, res) {
  const {
    name,
    email,
    password,
    address,
    additional,
    neighborhood,
    city,
    state,
    zip_code,
    isAdmin = false,
  } = req.body;

  try {
    // Criar o novo usuário
    const newUser = await serviceUsers.CreateUser(
      name,
      email,
      password,
      address,
      additional,
      neighborhood,
      city,
      state,
      zip_code,
      isAdmin
    );

    // Gerar o token JWT com o ID do usuário criado
    const jwtToken = token.CreateJWT(newUser.id);

    return res.status(201).json({
      message: "User created successfully",
      user: newUser,
      user: isAdmin,
      token: jwtToken, // Enviando o token gerado
    });
  } catch (error) {
    if (error.message === "User already exists") {
      return res.status(400).json({ message: "User already exists" });
    }
    console.error("Error creating user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function Login(req, res) {
  const { email, password } = req.body;

  try {
    const user = await serviceUsers.Login(email);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const hashedPassword = user.password;
    const isPasswordValid = await serviceUsers.verifyPassword(
      password,
      hashedPassword
    );

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const jwtToken = token.CreateJWT(user.id);

    // Remover a senha do objeto do usuário antes de retornar
    const { password: _, ...userWithoutPassword } = user;

    return res.status(200).json({
      message: "Login bem-sucedido",
      user: userWithoutPassword,
      token: jwtToken,
    });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function Perfil(req, res) {
  try {
    const id = req.id_user;

    const user = await serviceUsers.Perfil(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Remova o campo de senha antes de retornar os dados
    const { password, ...userWithoutPassword } = user;

    return res.status(200).json(userWithoutPassword);
  } catch (error) {
    console.error("Error fetching perfil:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function Favorites(req, res) {
  try {
    const id = req.id_user;
    const favorites = await serviceUsers.favorites(id);

    res.status(200).json(favorites);
  } catch (error) {
    console.error("Error fetching favorites:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export default { CreateUser, Login, Perfil, Favorites };
