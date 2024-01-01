/**
 * Associates a field type with a quest. 
 * List of field types:
 * - singlestr: single string enclosed in quotes
 * - singlecap: single capitalized string
 * - arraystr: array of strings enclosed in quotes
 * - arraycap: array of capitalized strings 
 * - number: number
 * - boolean: boolean
 * - optarraycap: can be either string or array, capitalized
 * - optarraystr: can be either string or array, enclosed in quotes
 */
export const QUEST_DEFINITIONS = {
    "name": "singlestr",
    "menu_item": "singlecap",
    "description": "arraystr",
    "quest_type": "singlecap",
    "reward": ["reward_type", "amount"],
    "reward_type": "singlecap",
    "amount": "number",
    "required_amount": "number",
    "required_item": "optarraycap",
    "required_entity": "optarraycap",
    "sheep_color": "singlecap",
    "commands": "arraystr",
    "potion": ["type", "upgraded", "extended"], // TODO: add potion types
    "type": "singlecap",
    "upgraded": "boolean",
    "extended": "boolean",
    "custom_item": ["type", "name", "lore"], // TODO: add custom item types
    "type": "singlecap",
    "name": "singlestr",
    "lore": "arraystr",
    "location": ["world", "x", "y", "z", "radius"],
    "world": "singlestr",
    "x": "number",
    "y": "number",
    "z": "number",
    "radius": "number",
    "villager_profession": "singlecap",
    "villager_level": "number",
};

export const QUEST_ALL = [
    "name", "menu_item", "description", "reward", "required_amount"
];

export const QUEST_ITEM = [
    "required_item"
];

export const QUEST_ENTITY = [
    "required_entity"
];

export const QUEST_SHEEP = [
    "sheep_color"
];

export const QUEST_POTION = [
    "potion"
];

export const QUEST_COMMAND = [
    "commands"
];

export const QUEST_CUSTOM_ITEM = [
    "custom_item"
];

export const QUEST_LOCATION = [
    "location"
];

export const QUEST_VILLAGER = [
    "villager_profession", "villager_level"
];

