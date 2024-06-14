export default class CardService {

    _spreadsheetId = '1dLmGkh3puSk0_N9Legpd9Ajq1EtVsQcwPlqolji1Gvg';

    getCards = async () => {
        console.log('getCards()');
        const response = await fetch(`https://docs.google.com/spreadsheets/d/${this._spreadsheetId}/gviz/tq?tqx=out:json`);
        if (!response.ok) {
            throw new Error(`Could not fetch, received: ${response.status}`);
        };
        const result = await response.text(),
            json = JSON.parse(result.replace(/.*google.visualization.Query.setResponse\({(.*?)}\);?/s, '{$1}'));
            
        const headings = json.table.cols.map(item => item.label);

        //let row = {};
        // data of each row is associated to the headings
        let data = json.table.rows.map(item => {
            let row = {};
            item.c.forEach((cell, idx) => {
                row[headings[idx]] = cell?.v?? null;
            });
            return row;
        });
        const cleanData = data.filter(card => {
            if (card.de) return card;
        });  

        return cleanData.map(this._transformCard);       
    }

    _transformCard = (card, i) => {
            return {
                id: i,
                de: card.de,
                rus: card.rus,
                eng: card.eng,
                type: card.type,
                gen: card.gen,
                th: card.th,       //theme
                pl: card.pl,       //plural 
                pr: card.pr,       //pretaeritum 
                pa: card.pa,       //partizip II 
                ko: card.ko,       //komparativ 
                su: card.su,       //superlativ 
                }
    }

    randomCards = (num, currentCards, allCards, remembered, prevPropsCurrentCards) => {
        let maxNum = (allCards.length - remembered.length);
        if (maxNum > 0) {
            maxNum = Math.min(num, maxNum);
            
            if (currentCards.length < maxNum) {
                let newCards = currentCards.map(item => item.id);
                while (newCards.length < maxNum) {
                    const random = Math.floor(Math.random() * allCards.length);
                    if (!newCards.includes(random) && !remembered.includes(random)) {
                        newCards.push(random);
                    }
                }
                console.log(`randomCards(): num/maxNum ${num}/${maxNum}, currentNum ${currentCards.length}, newCurrentNum:${newCards}, allNum ${allCards.length}, rememberedNum ${remembered.length}`);
                return newCards.map(newItem => allCards[newItem]);
            } else {
                //console.log(`return old cur trim ${currentCards.length}`);
                //console.log(currentCards);
                console.log(`randomCards(): num/maxNum ${num}/${maxNum}, currentNum ${currentCards.length}, RETURN.slice(0,${maxNum}), allNum ${allCards.length}, rememberedNum ${remembered.length}`);
                return currentCards.slice(0, maxNum);
            } 
        } else {
            return [];
        }
    }

}


