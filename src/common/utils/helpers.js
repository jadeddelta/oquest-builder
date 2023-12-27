const ORDER = ["name", "menu_item", "description",
    "quest_type", "required_item", "required_entity",
    "sheep_color", "required_amount", "reward"]

const IS_STRING = ["name", "description", "commands"]

export function questToString(quest, index) {
    // let questString = `quests:\n`;
    let questString = ``;
    questString += `  ${index}:\n`;
    ORDER.forEach((key) => {
        if (key in quest) {
            if (quest[key] instanceof Array) {
                if (quest[key].length === 1) {
                    questString += getString(key, quest[key][0]);
                    return;
                }
                questString += `    ${key}:\n`;
                quest[key].forEach((item) => {
                    questString += getArrayString(item, IS_STRING.includes(key));
                });
            } else if (quest[key] instanceof Object) {
                questString += `    ${key}:\n`;
                Object.keys(quest[key]).forEach((item) => {
                    questString += `      ${item}: ${quest[key][item]}\n`;
                });
            } else {
                questString += getString(key, quest[key]);
            }
        }
    });

    return questString;
}

//TODO: put all of these into the main logic,only did it momentarily for generating valid quests
function getString(key, value) {
    let baseString = `    ${key}: `
    baseString += (IS_STRING.includes(key)) ? `"${value}"\n` : value + `\n`;
    return baseString;
}

function getArrayString(value, isString) {
    let baseString = `      - `
    baseString += (isString) ? `"${value}"\n` : value + `\n`;
    return baseString;
}

export function questsToString(quests, startCount) {
    let questsString = `quests:\n`;
    quests.forEach((quest, index) => {
        questsString += questToString(quest, Number(startCount) + Number(index));
    });

    return questsString;
}