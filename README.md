# jadey's o'dailyquests builder

this is just a simple quest builder for the [o'dailyquests](https://ordwenplugins.gitbook.io/odailyquests/) plugin. this was primarily intended for development on GEO: Colenia, but it can be used for any server.

## usage
we have a silly netlify website now at [this link](https://mellow-zuccutto-1f0574.netlify.app/)!

to run from source, you'll need to have [node.js](https://nodejs.org/en/) installed. once you have that, you can run the following commands in the directory of this project:

```bash
npm install
npm run dev
```

## future plans
not much really, other than silly UI upgrades and fleshing out each quest type better. maybe we'll add a scroller/searcher that'll have all the minecraft blocks and all the minecraft potions and enchantments and whatnot, but that's way down the line. if you have any suggestions, feel free to open an issue or pull request. i'll probably add more features if i feel like it or if colenia needs it. maybe in the future, i'll host this on github pages so you don't have to download it, but that's also way down the line.

### to do list 
- [ ] INPUT VALIDATION!!! i trust people know the [documentation](https://ordwenplugins.gitbook.io/odailyquests/quests/create-a-quest) beforehand, but not everyone will and i want to make this as accessible as possible 
- [ ] add a scroller/searcher for all the minecraft blocks
- [ ] support for the COMMAND reward type
- [ ] support for location based quests
- [ ] support for villager based quests
- [ ] literally so much refactoring cause this code is UGLYYY
- [ ] maybe add a way to load quests from a file? or produce a string that encodes the quests?

## other things
special thanks to [ordwen](https://github.com/Ordwen) for making the whole thing in the first place, i just made a builder for it.
