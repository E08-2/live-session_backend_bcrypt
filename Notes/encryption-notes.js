// * 1. ENCRYPTION NOTES

// Never ever store passwords as plain text in your database!
// It is a huge security problem if anyone ever gets access to your db.
// A big help with this problem is to store passwords in a secure format.
// ? We can use bcrypt to help us with this!

// bcrypt lets us hash a password before storing it in our database
// Hashing: Converting a plain text password to an unreadable string, so others cannot read or reverse-engineer it.
// E.g. "abcd1234" --> kl39scbhi38cj etc...
// However, just generating a hash isn't secure enough in itself.
//	- Hackers have a big list of possible passwords, and a lot of computing power. They can compare the passwords to the hashes until they find a match.
//	- This is called a "dictionary attack".
//	- Note that we cannot make our users choose unique or difficult to guess passwords! Many may use "password" or "abc123"...	
// bcrypt helps us further protect our users in case our database is compromised by hashing every password with a "salt"
//	- A "salt" is a random character string added to the password before creating the hash value.
// This makes hackers' lives a lot harder, as a standard "dictionary" of hashes would no longer work.
// We can choose the number of "salting rounds"
//      - The more "rounds", the more secure, but the longer it takes!

// Finally, note that bcrypt is NOT only available in JavaScript!
