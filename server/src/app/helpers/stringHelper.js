module.exports = {
  generateRandomString(length = 5, characters = 'ACEFGHJKQRSTUVWXYZ245789') {
    let result = '';

    for (let i = 0; i < length; i++)
      result += characters.charAt(Math.floor(Math.random() * characters.length));

    return result;
  }
}