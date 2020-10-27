const accessEnv = (key, defaultValue) => {
    if (!(key in process.env)) {
      if (defaultValue) return defaultValue;
      throw new Error(`${key} not found in process.env!`);
    }
    return process.env[key];
  };
  
  module.exports = accessEnv;
  