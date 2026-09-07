const advisorRoot = document.querySelector('.advisor-main');
const whatsappNumber = advisorRoot?.getAttribute('data-whatsapp-number') || '';
const form = document.getElementById('advisorForm');
const briefOutput = document.getElementById('briefOutput');
const whatsappSendBtn = document.getElementById('whatsappSendBtn');

function updateBrief() {
  const propType = form?.querySelector<HTMLInputElement>('input[name="propertyType"]:checked')?.value || 'House';
  const size = (document.getElementById('sizeSelect') as HTMLSelectElement | null)?.value || '1 Kanal';
  const budget = (document.getElementById('budgetSelect') as HTMLSelectElement | null)?.value || 'PKR 8.0 to 12.0 Crore';
  const sector = (document.getElementById('sectorSelect') as HTMLSelectElement | null)?.value || 'Advisor Recommendation';
  const purpose = form?.querySelector<HTMLInputElement>('input[name="purpose"]:checked')?.value || 'Family Living';
  const timeline = (document.getElementById('timelineSelect') as HTMLSelectElement | null)?.value || 'Within 1-3 Months';

  const briefMessage = `Hello Ahmad / DHA Phase 6 Property Desk,

I would like an independent property consultation for DHA Phase 6 Lahore based on the following criteria:

- Property Type: ${propType}
- Size: ${size}
- Target Budget: ${budget}
- Preferred Sector: ${sector}
- Purpose: ${purpose}
- Timeline: ${timeline}

Please share verified on-ground options, recent price comps, and assist with document verification. Thank you!`;

  if (briefOutput) briefOutput.textContent = briefMessage;
  if (whatsappSendBtn) {
    whatsappSendBtn.setAttribute('href', `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(briefMessage)}`);
  }
}

form?.addEventListener('change', updateBrief);
updateBrief();
