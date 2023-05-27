const jwt = require('jsonwebtoken');
const jwksRsa = require('jwks-rsa');

const validateJwt = async (token) => {
  const { header } = jwt.decode(token, { complete: true });
  const jwksClient = jwksRsa({
    jwksUri: '<https://example.com/.well-known/jwks.json>',
  });

  const key = await jwksClient.getSigningKey(header.kid);
  const publicKey = key.getPublicKey();
  const options = { algorithms: ['RS256'] };

  try {
    jwt.verify(token, publicKey, options);
    return true;
  } catch (error) {
    console.error('Error validating JWT:', error.message);
    return false;
  }
};


exports.myCloudFunction = async (req, res) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    res.status(401).send({ message: 'Unauthorized' });
  }

  //Bearer eysdlfl;lwejfwwdw;elfjw
  const token = authorization.split(' ')[1];
  const isValid = await validateJwt(token);

  if (!isValid) {
    res.status(401).send({ message: 'Unauthorized' });
  }

  // Function logic goes here

  res.status(200).send({ message: 'Success' });
};
