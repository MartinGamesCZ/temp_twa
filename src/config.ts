import { chown, link } from "fs";
import path from "path";

export const BUILD_FOLDER = path.join(import.meta.dirname, "../dist");
export const TEMPLATE = path.join(
  import.meta.dirname,
  "../template/index.html"
);

export const LINK_MAP = {
  $: {
    title: "Rozbil se počítač, co uděláš? (Hardcode edition)",
    description: "Klient samozřejmě neřekl, o jaký problém se jedná.",
    image:
      "https://images.pexels.com/photos/3777568/pexels-photo-3777568.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    choices: [
      {
        text: "Zeptám se ho, co je špatně.",
        link: "/a",
      },
      {
        text: "Pošlu ho pryč a podívám se na to sám.",
        link: "/b",
      },
      {
        text: "Dám si oběd.",
        link: "/c",
      },
    ],
  },
  a: {
    title: "Klient se naštval a odešel!",
    description: "Klient se naštval. Seš ajťák, přeci to máš vědět ty!",
    image:
      "https://as1.ftcdn.net/v2/jpg/02/60/75/58/1000_F_260755814_LABNmdLIScSxG1YGziJb3EhFjfleDRtP.jpg",
    fr: "PROHRÁL JSI (extroverte)",
  },
  b: {
    title: "Rozdělal jsi počítač a našel kobru!",
    description:
      "Uživatel chtěl asi nainstalovat Python, ale omylem nainstaloval kobru.",
    image:
      "https://preview.redd.it/he-installed-cobra-instead-of-python-v0-p5tnlpdzpax81.gif?format=png8&s=0daa0fe69a9d0dd70980e3c3ec86ea4008382715",
    choices: [
      {
        text: "Zkusím kobru odinstalovat.",
        link: "/ba",
      },
      {
        text: "Pozvu kobru na kafe.",
        link: "/bb",
      },
      {
        text: "Zavolám policii.",
        link: "/bc",
      },
    ],
  },
  ba: {
    title: "Kobra se ti směje!",
    description:
      "Kobra se ti směje, že si se pokusil odinstalovat kobru a selhal.",
    image: "https://live.staticflickr.com/7526/29396474024_ff9aa8828b_b.jpg",
    fr: "PROHRÁL JSI (hahahhahahaahahhahahahashahahahhahahhahaha)",
  },
  bb: {
    title: "Kobra si dala kafe!",
    description: "Kobra si dala kafe a odešla. Byla hodná.",
    choices: [
      {
        text: "Pokračovat",
        link: "/bba",
      },
    ],
    image:
      "https://creator.nightcafe.studio/jobs/qG6g3zgjd066Ln8eSwIz/qG6g3zgjd066Ln8eSwIz--1--4pnrk.jpg",
  },
  bc: {
    title: "Kobra je policista!",
    description: "Kobra je policista a zatkne tě za volání policie.",
    fr: "PROHRÁL JSI (srabe)",
    image:
      "https://image.spreadshirtmedia.net/image-server/v1/products/T1459A839PA4459PT28D328610517W8400H10000/views/1,width=550,height=550,appearanceId=839,backgroundColor=F2F2F2/snake-policeman-sticker.jpg",
  },
  bba: {
    title: "Líbí se ti kobra?",
    description: "Hmmmm?",
    choices: [
      {
        text: "Ano",
        link: "/bbba",
      },
      {
        text: "Ne",
        link: "/bbbb",
      },
    ],
    image: "https://i.redd.it/qw38np9oc9c81.jpg",
  },
  bbba: {
    title: "Kobra ti dala číslo!",
    description: "Kobra ti dala číslo a pozvala tě na rande.",
    choices: [
      {
        text: "Zpět do práce",
        link: "/bbbba",
      },
    ],
    image:
      "https://www.coppertistwu.com/cdn/shop/products/Cobra-Phone-Stand_0fa11b29-1a9e-4805-b391-539a418f4275.webp?v=1666664659",
  },
  bbbba: {
    title: "Počítač už funguje!",
    description: "Počítač už funguje, co uděláš dále?",
    choices: [
      {
        text: "Zavolám klientovi",
        link: "/bbbbaa",
      },
      {
        text: "Podívám se na jeho soubory",
        link: "/bbbbab",
      },
    ],
    image: "https://i.ytimg.com/vi/r5Ee1bnRg3Y/sddefault.jpg",
  },
  bbbbaa: {
    title: "Klient je naštvaný!",
    description: "Klient je naštvaný, že jsi mu nezavolal dříve!",
    fr: "PROHRÁL JSI (proč jsi nezavolal?)",
    image:
      "https://media.istockphoto.com/id/1329523093/photo/shot-of-a-young-man-smashing-a-laptop-on-a-table-at-home.jpg?s=612x612&w=0&k=20&c=sDytF5Rlm-CvxnuVN-Kh4qe6jG1zmahj1sRA0Cx0ePQ=",
  },
  bbbbab: {
    title: "Našel jsi zajímavý soubor!",
    description: "launchicnuke.exe",
    choices: [
      {
        text: "Spustím",
        link: "/bbbbaba",
      },
      {
        text: "Nechám to být a pc vrátím",
        link: "/bbbbabb",
      },
    ],
    image:
      "https://www.digitaltrends.com/wp-content/uploads/2022/07/Windows-Desktop-New-Folder.jpg?fit=640%2C427&p=1",
  },
  bbbbaba: {
    title: "Ooops, atomovka!",
    description:
      "Ale tak spadlo to na dům zákazníka, takže je spokojený (vypařil se blahem).",
    fr: "VYHRÁL JSI",
    image:
      "https://images.ctfassets.net/pjshm78m9jt4/3i7h7TJTqsdre8rC4PdwSM/5a503859e7ac27fa28ebd29eb1988192/Screenshot_2024-10-21_at_17.31.45.jpg?fm=jpg&fit=fill&w=400&h=225&q=80",
  },
  bbbbabb: {
    title: "Klient je nespokojený!",
    description: "Prý jsi mu přebral holku (kobru)!",
    fr: "PROHRÁL JSI (kobrobaliči)",
    image:
      "https://media.istockphoto.com/id/1080816484/photo/i-warned-you-that-would-happen.jpg?s=612x612&w=0&k=20&c=0jc1YxuoWJXupz2QPmuCFFCqkQLIP6riUhYmep3cXaI=",
  },
  bbbb: {
    title: "Kobra se ti nelíbí!",
    description: "Kobra se ti nelíbí a tak tě sežrala.",
    fr: "PROHRÁL JSI (btw prý jsi jí chutnal)",
    image:
      "https://images.nightcafe.studio/jobs/EDevjcbgcKBzOoXDwNJu/EDevjcbgcKBzOoXDwNJu--1--ynllt.jpg?tr=w-1600,c-at_max",
  },
  c: {
    title: "Dáváš si oběd.",
    description: "Máš hlad, tak si dáváš oběd. Vybral sis čoko pizzu.",
    image: "https://i.ytimg.com/vi/tl9jdUIRCxY/sddefault.jpg",
    choices: [
      {
        text: "Sním to.",
        link: "/ca",
      },
      {
        text: "Asi dobrý, jdu domů.",
        link: "/cb",
      },
    ],
  },
  ca: {
    title: "Někdo tady je gurmán!",
    description: "Bohužel tě viděl Ital a dostal jsi po čumáku.",
    fr: "PROHRÁL JSI (gurmáne)",
    image:
      "https://i.ytimg.com/vi/v1bQND4Pkqc/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBheZLlBXWly5g9mFyR0y8-4KtaEA",
  },
  cb: {
    title: "Nezapomněl jsi na něco?",
    description: "Zapomněl jsi na to, že jsi měl dneska pracovat.",
    fr: "PROHRÁL JSI (lenochu)",
    image:
      "https://c8.alamy.com/comp/B5F4BC/an-asian-man-sleeping-in-a-chair-suzhou-china-B5F4BC.jpg",
  },
};
