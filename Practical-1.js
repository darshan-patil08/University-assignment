console.log("Practical-1 Enrollment Number: 202604104610046");
const createContact = (name, email, ...phoneNumbers) => {
  return {
    name,
    email,
    phoneNumbers: phoneNumbers.length > 0 ? phoneNumbers : ["Not Provided"],
  };
 };

//creating a existing contact list

const existingContacts = [
    createContact("Darsh Patil", "darshan.patil@gmail.com", 1234567890, 9986543210, 1122334455),
    createContact("Divyesh Sonar", "divyesh.sonar@gmail.com", 2345678901, 5678901234)
];

//creating a new contact list

const newlyAddedContacts = [
    createContact("Mohit Sharma", "mohit.sharma@gmail.com",9054156789),]

//merging the contact lists using spread operator
    const contacts = [...existingContacts, ...newlyAddedContacts];

console.log("Contact List:");
//using for of loop to print the contact details
for (const contact of contacts) {
    const contactDetails = `
    Name: ${contact.name}
    Email: ${contact.email}
    Phone Numbers: ${contact.phoneNumbers.join(", ")}
    ----------------------------`;
    console.log(contactDetails);
}