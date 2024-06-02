function buildName(firstName: string, ...restOfName: string[]) {
  return firstName + " " + restOfName.join(" ");
}

let buildNameFun: (fname: string, ...rest: string[]) => string = buildName;
console.log(buildNameFun('zhang', 'yuanyuan'))


// let deck = {
//   suits: ["hearts", "spades", "clubs", "diamonds"],
//   cards: Array(52),
//   createCardPicker: function() {
//       return function() {
//         let pickedCard = Math.floor(Math.random() * 52);
//         let pickedSuit = Math.floor(pickedCard / 13);

//         // 这里 this 指向 window
//         // error: "this" 隐式具有类型 "any"，因为它没有类型注释: 此容器隐藏了 "this" 的外部值。
//         return {suit: this.suits[pickedSuit], card: pickedCard % 13};
//       }
//   }
// }

// let cardPicker = deck.createCardPicker();
// let pickedCard = cardPicker();

// console.log("card: " + pickedCard.card + " of " + pickedCard.suit);


// 箭头函数能保存函数创建时的 this值，而不是调用时的值
// let deck = {
//   suits: ["hearts", "spades", "clubs", "diamonds"],
//   cards: Array(52),
//   createCardPicker: function() {
//       // NOTE: the line below is now an arrow function, allowing us to capture 'this' right here
//       return () => {
//           let pickedCard = Math.floor(Math.random() * 52);
//           let pickedSuit = Math.floor(pickedCard / 13);

//           return {suit: this.suits[pickedSuit], card: pickedCard % 13};
//       }
//   }
// }

// let cardPicker = deck.createCardPicker();
// let pickedCard = cardPicker();

// console.log("card: " + pickedCard.card + " of " + pickedCard.suit); // card: 4 of clubs




interface Card {
  suit: string;
  card: number;
}
interface Deck {
  suits: string[];
  cards: number[];
  // this 是 Deck 类型的
  createCardPicker(this: Deck): () => Card;
}
let deck: Deck = {
  // 这个数组存储了四种扑克牌的花色，分别是"hearts"（红心），"spades"（黑桃），"clubs"（梅花）和"diamonds"（方块）
  suits: ["hearts", "spades", "clubs", "diamonds"], 
  cards: Array(52), // 扑克牌张数
  // 随机选择一张牌
  createCardPicker: function (this: Deck) {
      // 返回一个箭头函数 来确保函数内部可以访问到Deck对象的属性
      return () => {
        let pickedCard = Math.floor(Math.random() * 52);
        let pickedSuit = Math.floor(pickedCard / 13);
        // 箭头函数能保存函数创建时的 this值，而不是调用时的值
        return {suit: this.suits[pickedSuit], card: pickedCard % 13};
      }
  }
}

let cardPicker = deck.createCardPicker();
let pickedCard = cardPicker();

console.log("card: " + pickedCard.card + " of " + pickedCard.suit); // card: 1 of diamonds



class Handler {
  info?: string;
  onClickGood(this: void) {
      // can't use this here because it's of type void!
      console.log('clicked!');
  }
}
let h = new Handler();
h.onClickGood()



