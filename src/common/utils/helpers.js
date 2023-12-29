import { QUEST_DEFINITIONS } from "./quest-definitions";

const ORDER = [
    "name", "menu_item", "description", "quest_type",
    "location", "villager_profession", "villager_level",
    "required_item", "potion", "required_entity",
    "sheep_color", "required_amount", "reward", "commands"
]

const IS_STRING = ["name", "description", "commands", "lore"]

export function questToString(quest, index) {
    let questString = ``;
    questString += `  ${index}:\n`;
    ORDER.forEach((key) => {
        if (key in quest) {
            const questType = QUEST_DEFINITIONS[key];
            if (Array.isArray(questType)) {
                // TODO: update this to take into account the command/lore fields
                questString += `    ${key}:\n`;
                questType.forEach((item) => {
                    questString += `      ${item}: ${quest[item]}\n`;
                });
                return;
            }

            switch (questType) {
                case "singlecap":
                case "singlestr":
                case "number":
                    questString += getString(key, quest[key]);
                    break;
                case "optarraystr":
                case "optarraycap":
                    if (quest[key].length === 1 || !Array.isArray(quest[key])) {
                        questString += getString(key, quest[key][0]);
                        break;
                    }
                case "arraycap":
                case "arraystr":
                    questString += `    ${key}:\n`;
                    quest[key].forEach((item) => {
                        questString += getArrayString(item, IS_STRING.includes(key));
                    });
                    break;
                default:
                    questString += "what";
                    break;
            }
        }
    });

    return questString;
}

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