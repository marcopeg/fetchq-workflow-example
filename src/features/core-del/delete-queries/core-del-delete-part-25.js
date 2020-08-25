const { callNoResQuery } = require('../db');

const handler = async doc => {
  console.log('Delete part 25>', doc.subject);
  try {
    const setupId = doc.payload.setupId;
    await callNoResQuery(`DELETE FROM VareGruppe WHERE Opsaetning = ${setupId}`);
    await callNoResQuery(`DELETE FROM RykkerPostering WHERE Opsaetning = ${setupId}`);
    await callNoResQuery(`DELETE FROM Asset WHERE Opsaetning = ${setupId}`);
    await callNoResQuery(`DELETE FROM AssetGroup WHERE Opsaetning = ${setupId}`);
    await callNoResQuery(`DELETE FROM PeriodiseringsKladdePostering WHERE Opsaetning = ${setupId}`);
    await callNoResQuery(`DELETE FROM RemittanceAdviceEntry WHERE Opsaetning = ${setupId}`);
    await callNoResQuery(`DELETE FROM RemittanceAdvice WHERE Opsaetning = ${setupId}`);
    await callNoResQuery(`DELETE FROM RemittanceAdviceEntryDraft WHERE Opsaetning = ${setupId}`);
    await callNoResQuery(`DELETE FROM RemittanceAdviceDraft WHERE Opsaetning = ${setupId}`);
    await doc.forward('core_del_delete_part_26');
    return doc.complete();
  } catch (err) {
    return doc.reschedule('+1s');
  }
};

module.exports = {
  queue: 'core_del_delete_part_25',
  handler,
};