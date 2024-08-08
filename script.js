function calculateMaterials() {
    const tier = document.getElementById('tier').value;
    const processedMaterials = parseInt(document.getElementById('processed-materials').value);
    const returnRate = parseFloat(document.getElementById('return-rate').value) / 100;

    const refiningRequirements = {
        T2: { refined: 1, nonRefined: 2 },
        T3: { refined: 1, nonRefined: 2 },
        T4: { refined: 1, nonRefined: 3 },
        T5: { refined: 1, nonRefined: 4 },
        T6: { refined: 1, nonRefined: 5 },
        T7: { refined: 1, nonRefined: 5 },
        T8: { refined: 1, nonRefined: 5 }
    };

    const tiers = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8'];
    const tierIndex = tiers.indexOf(tier);

    let rawMaterials = {};
    let refinedMaterials = {};

    for (let i = 2; i <= tierIndex + 2; i++) {
        rawMaterials[`T${i}`] = 0;
        refinedMaterials[`T${i}`] = 0;
    }

    let currentProcessedMaterials = processedMaterials;

    for (let i = tierIndex; i >= 0; i--) {
        const currentTier = tiers[i];
        const { refined, nonRefined } = refiningRequirements[currentTier];

        const totalMaterials = currentProcessedMaterials * (refined + nonRefined);
        const nonRefinedMaterials = Math.ceil(totalMaterials / (1 - returnRate)) - currentProcessedMaterials;

        rawMaterials[currentTier] += nonRefinedMaterials;
        refinedMaterials[currentTier] += currentProcessedMaterials;

        currentProcessedMaterials = Math.ceil(nonRefinedMaterials * (1 + returnRate));
    }

    const rawMaterialsResult = document.getElementById('raw-materials-result');
    const refinedMaterialsResult = document.getElementById('refined-materials-result');

    rawMaterialsResult.innerHTML = '';
    refinedMaterialsResult.innerHTML = '';

    for (let i = tierIndex; i >= 0; i--) {
        const currentTier = tiers[i];
        rawMaterialsResult.innerHTML += `<p>Tier ${currentTier}: ${rawMaterials[currentTier]}</p>`;
        if (i !== tierIndex) {
            refinedMaterialsResult.innerHTML += `<p>Tier ${currentTier}: ${refinedMaterials[currentTier]}</p>`;
        }
    }
}
