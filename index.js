const { Command } = require('commander');

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require('./contacts');

const program = new Command();
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      // ...
      try {
        const result = await listContacts();
        console.table(result);
      } catch (err) {
        console.error(err);
      }
      break;

    case 'get':
      // ... id
      try {
        const result = await getContactById(Number(id));
        console.log(result);
      } catch (err) {
        console.error(err);
      }
      break;

    case 'add':
      // ... name email phone
      try {
        const result = await addContact(name, email, phone);
        console.log(result);
      } catch (err) {
        console.error(err);
      }
      break;

    case 'remove':
      // ... id
      try {
        const result = await removeContact(Number(id));
        console.log(result);
      } catch (err) {
        console.error(err);
      }
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);

//! it is my testing func I need it!!!
// async function testFunc(params) {
//   const result = await listContacts();
//   const result = await removeContact(17);
//   const result = await addContact('somebody', 'hisSOme@email.com', '098765432');
//   const result = await getContactById(12);
//   console.log(result, 2);
// }

// testFunc();
