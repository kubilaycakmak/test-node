import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

const hashPassword = async (password) => {
    try {
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
        return hashedPassword;
    } catch (error) {
        console.log(error);
    }
}

const comparePassword = async (password, hashedPassword) => {
    try {
        const isMatch = await bcrypt.compare(password, hashedPassword);
        return isMatch;
    } catch (error) {
        console.log(error);
    }
}

export { 
    hashPassword,
    comparePassword
}

