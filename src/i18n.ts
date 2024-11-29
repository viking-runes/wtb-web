// src/i18n.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n
  .use(initReactI18next) // Passes i18n down to react-i18next
  .init({
    resources: {
      en: {
        translation: {
          language: "English",
          top1: "This is a social experiment!",
          top2: "HOLD $WTB ON #SOLANA GET THE #BITCOIN AIRDROP/WL.",
          top3: "All BTC ecosystem projects can claim:",
          top4: "$WTB holders have access to Airdrop/WL.",
          top5: "The rules are freely defined and the project is open.",
          step2: "Creat multichain address with phantom wallet.",
          step3: "Receive or buy $WTB using the solana address.",
          step4:
            "Your address will be displayed on the WELCOMETOBITCOIN.IO listings.",
          step5:
            "Receive Airdrop or WL  from project in the Bitcoin ecosystem.",
        },
      },
      zh: {
        translation: {
          language: "中文简体",
          top1: "这是一个社会实验！",
          top2: "在 #Solana上持有$WTB可以得到#Bitcoin的空投/白名单",
          top3: "所有BTC生态系统的项目方都可以声明：",
          top4: "$WTB持有者拥有获得空投/白名单的机会。",
          top5: "规则是自由定义的，项目是开放性的。",
          step2: "使用Phantom钱包创建多链地址。",
          step3: "在SOLANA链上接收或购买$WTB",
          step4:
            "您的钱包地址将显示在本网页的以下列表中。\n(WELCOMETOBITION.IO)",
          step5: "在比特币生态系统中，有机会获得项目的空投/白名单！",
        },
      },
      ja: {
        translation: {
          language: "日本语",
          top1: "これは社会実験だ！",
          top2: "#SOLANA でWTBを持つ\n#BITCOIN からエアドロップ/ホワイトリストを入手できます。",
          top3: "BTCエコシステム内のすべてのプロジェクト関係者が宣言できる：",
          top4: "WTBホルダーはエアドロップ/ホワイトリストにアクセスできる。",
          top5: "ルールは自由に定義され、プロジェクトはオープンエンドである。",
          step2: "PHANTOMウォレットでマルチチェーンアドレスを作成する",
          step3: "SOLANAチェーンで$WTBを受け取る、または買う",
          step4:
            "あなたのウォレットアドレスは、このページの以下のリストに表示されます。\nWELCOMETOBITCOIN.IO",
          step5:
            "ビットコインのエコシステムで\nプロジェクトのエアドロップ/ホワイトリストに載る機会！",
        },
      },
      ko: {
        translation: {
          language: "한국어",
          top1: "소셜 실험입니다!",
          top2: "#SOLANA 에서 WTB 보유\n#BITCOIN 에서 에어드랍/화이트리스트를 받을 수 있습니다.",
          top3: "BTC 생태계의 모든 프로젝트 당사자가 선언할 수 있습니다:",
          top4: "WTB 보유자는 에어드랍/화이트 리스트에 액세스할 수 있습니다.",
          top5: "규칙은 자유롭게 정의되며 프로젝트는 개방형입니다.",
          step2: "PHANTOM 월렛으로 멀티체인 주소 생성하기",
          step3: "SOLANA 체인에서 $WTB를 받거나 구매하세요.",
          step4: "지갑 주소는 이 페이지의 다음 목록에 표시됩니다.",
          step5:
            "비트코인 생태계에서는\n프로젝트 에어드랍/화이트 리스트에 오를 수 있는 기회!",
        },
      },
    },
    lng: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
