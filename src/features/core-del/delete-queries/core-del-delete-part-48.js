const { callNoResQuery } = require('../db');

const handler = async doc => {
  console.log('Delete part 48>', doc.subject);
  try {
    const agId = doc.payload.agId;
    const setupId = doc.payload.setupId;
    await callNoResQuery(`DELETE FROM LagerFlytKladde WHERE Opsaetning = ${setupId}`);
    await callNoResQuery(`DELETE FROM LagerStatusKostpris WHERE Opsaetning = ${setupId}`);
    await callNoResQuery(`DELETE FROM LicenseModuleLegacyPrice WHERE Opsaetning = ${setupId}`);
    await callNoResQuery(`DELETE FROM PakkeLoesningVare WHERE Opsaetning = ${setupId}`);
    await callNoResQuery(`DELETE FROM ProjektAktivitetsOpgaveVare WHERE Opsaetning = ${setupId}`);
    await callNoResQuery(`DELETE FROM ProjektRegistreringVare WHERE Opsaetning = ${setupId}`);
    await callNoResQuery(`DELETE FROM VarePrisValuta WHERE Opsaetning = ${setupId}`);
    await callNoResQuery(`DELETE FROM ArdCompany WHERE AgreementNumber = ${agId}`);
    await callNoResQuery(`DELETE FROM ArdCompanyReports WHERE SetupId = ${setupId}`);
    await callNoResQuery(`DELETE FROM ArdSkabelon WHERE Aftalenr = ${agId}`);
    await doc.forward('core_del_delete_part_49');
    return doc.complete();
  } catch (err) {
    return doc.reschedule('+1s');
  }
};

module.exports = {
  queue: 'core_del_delete_part_48',
  handler,
};