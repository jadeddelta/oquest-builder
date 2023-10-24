export function questToString(quest, index) {
    const ORDER = ["name", "menu_item", "description",
        "quest_type", "required_item", "required_entity", "reward"]

    // let questString = `quests:\n`;
    let questString = ``;
    questString += `  ${index}:\n`;
    ORDER.forEach((key) => {
        if (key in quest) {
            if (quest[key] instanceof Array) {
                questString += `    ${key}:\n`;
                quest[key].forEach((item) => {
                    questString += `      - ${item}\n`;
                });
            } else if (quest[key] instanceof Object) {
                questString += `    ${key}:\n`;
                Object.keys(quest[key]).forEach((item) => {
                    questString += `      ${item}: ${quest[key][item]}\n`;
                });
            } else {
                questString += `    ${key}: ${quest[key]}\n`;
            }
        }
    });

    return questString;
}

export function questsToString(quests, startCount) {
    let questsString = `quests:\n`;
    quests.forEach((quest, index) => {
        questsString += questToString(quest, Number(startCount) + Number(index));
    });

    return questsString;
}