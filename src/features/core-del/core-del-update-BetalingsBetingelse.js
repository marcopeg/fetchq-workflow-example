const { callNoResQuery } = require('./db');

const handler = async doc => {
  console.log('Update BetalingsBetingelse>', doc.subject);
  try {
    const setupId = doc.payload.setupId;
    await callNoResQuery(`UPDATE Debitor SET BetalingsBetingelse = NULL WHERE Opsaetning = ${setupId}`);
    await callNoResQuery(`UPDATE Kreditor SET BetalingsBetingelse = NULL WHERE Opsaetning = ${setupId}`);
    await callNoResQuery(`UPDATE Opsaetning SET SystemLogo = NULL WHERE Opsaetning = ${setupId}`);
    await callNoResQuery(`UPDATE FakturaLinieKladde SET OverfKladdeNr = NULL, OverfLinieNr = NULL WHERE Opsaetning = ${setupId}`);
    console.log("Forwarding");
    await doc.forward('core_del_delete_part_1');
    return doc.complete();
  } catch (err) {
    console.log(err)
    return doc.reschedule('+1s');
  }
};

module.exports = {
  queue: 'core_del_Update_BetalingsBetingelse',
  handler,
};