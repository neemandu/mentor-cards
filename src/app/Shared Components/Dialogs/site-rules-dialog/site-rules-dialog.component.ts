import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LangDirectionService } from 'src/app/Services/LangDirectionService.service';

interface SiteRulesSection {
  title: string;
  content: string[];
  subsections?: SiteRulesSection[];
}

@Component({
  selector: 'app-site-rules-dialog',
  templateUrl: './site-rules-dialog.component.html',
  styleUrls: ['./site-rules-dialog.component.css'],
})
export class SiteRulesDialogComponent implements OnInit {
  get siteRulesContent(): SiteRulesSection[] {
    return this.langDirectionService.currentLang === 'en'
      ? this.siteRulesContentEn
      : this.siteRulesContentHe;
  }

  get privacyPolicyContent(): SiteRulesSection[] {
    return this.langDirectionService.currentLang === 'en'
      ? this.privacyPolicyContentEn
      : this.privacyPolicyContentHe;
  }

  get contactInfo() {
    return this.langDirectionService.currentLang === 'en'
      ? this.contactInfoEn
      : this.contactInfoHe;
  }

  get siteIntro() {
    return this.langDirectionService.currentLang === 'en'
      ? this.siteIntroEn
      : this.siteIntroHe;
  }

  get privacyIntro() {
    return this.langDirectionService.currentLang === 'en'
      ? this.privacyIntroEn
      : this.privacyIntroHe;
  }

  siteRulesContentHe: SiteRulesSection[] = [
    {
      title: 'כללי',
      content: [
        'הגלישה באתר כפופה לתנאים המפורטים בתקנון ותנאי שימוש אלו (״התקנון״). אנא קרא את התקנון בקפידה, שכן הגלישה באתר וביצוע פעולות בו מעידים על הסכמתך לתנאים הכלולים בתקנון. כמו כן, האתר שומר את זכותו לשנות את תנאי התקנון, מעת לעת, על פי שיקול דעתו הבלעדי וללא הודעה מוקדמת. מועד החלת השינוי כאמור יהיה מרגע פרסומו באתר.',
        'האמור בתקנון זה מתייחס באופן שווה לבני שני המינים והשימוש בלשון זכר או נקבה הוא מטעמי נוחות בלבד.',
        'תנאי התקנון חלים על שימוש באתר ובתכנים הכלולים בו באמצעות כל מחשב או מכשיר תקשורת אחר (כדוגמת טלפון סלולרי, מחשבי טאבלט וכיו"ב). כמו כן הם חלים על השימוש באתר, בין באמצעות רשת האינטרנט ובין באמצעות כל רשת או אמצעי תקשורת אחרים.',
        'הגלישה באתר מותרת בכל גיל. פעולה של קטין מתחת לגיל 18 מחייבת אישור הורה או אפוטרופוס.',
        'במקרה בו המשתמש ימסור פרטים כוזבים ביודעין, או יבצע פעולה שיש בה כדי לפגוע בפעילות התקינה של האתר, או תגרום נזק ישיר או עקיף למפעילת האתר – יהא אחראי במלואו לכל נזק, הפסד או הוצאה שתיגרם עקב כך, ויחויב בשיפוי מלא של מפעילת האתר.',
        'סרטוני הדרכה, תמונות והצגת המוצרים הינן לשם המחשה בלבד ואינם מחייבים את מפעיל האתר.',
        'במקרה שייקבע כי הוראה בתקנון זה אינה ניתנת לאכיפה או שהינה חסרת תוקף מטעם כלשהו, לא יהא בכך כדי להשפיע או לפגוע בחוקיותן, תקפותן ואכיפתן של שאר הוראות התקנון.',
      ],
    },
    {
      title: 'הגלישה באתר',
      content: [
        'הגלישה באתר והעיון בו אינם דורשים הרשמה, והוא פתוח לכל גולש.',
        'בעת השארת פרטים באתר יתבקש הגולש למסור פרטים אישיים כגון: שם, טלפון וכתובת דוא"ל. מובהר כי אין חובה חוקית למסור פרטים אלה, אך בלעדיהם לא ניתן להשתמש בשירותים או ליצור קשר. פרטים שגויים עלולים למנוע שימוש תקין, ובמקרה של שינוי – יש לעדכנם.',
        'האתר לא יעשה בפרטים שנמסרו שימוש, אלא בהתאם למדיניות הפרטיות של האתר המהווה חלק בלתי נפרד מתקנון זה.',
        'השארת פרטים באתר מהווה הסכמה לקבלת תוכן שיווקי ועדכונים, לרבות מבצעים, הצעות מסחריות ופרסומים, באמצעי התקשורת שנמסרו – בהתאם למדיניות הפרטיות.',
        'האתר רשאי לקבוע, מעת לעת, דרכי זיהוי לכניסה לאתר ובכלל זה התחברות לאתר דרך הפייסבוק ו/או רשת חברתית אחרת ו/או פלטפורמה אחרת.',
        'האתר רשאי למנוע מכל גולש שימוש באתר לפי שיקול דעתו המוחלט. מבלי לגרוע מהאמור לעיל, רשאי האתר לחסום גישתו אליו בכל אחד מהמקרים הבאים:',
      ],
      subsections: [
        {
          title: 'מקרים לחסימת גישה',
          content: [
            'אם בעת השארת פרטים באתר נמסרו במתכוון פרטים שגויים;',
            'במקרה שנעשה שימוש באתר לביצוע או כדי לנסות לבצע מעשה בלתי חוקי על-פי דיני מדינת ישראל, או מעשה הנחזה על פניו כבלתי חוקי כאמור, או כדי לאפשר, להקל, לסייע או לעודד ביצועו של מעשה כזה;',
            'אם הופרו תנאי תקנון זה;',
            'במקרה שנעשה שימוש באתר בניסיון להתחרות באתר;',
            'אם נעשתה על ידי גולש כל פעולה שתמנע מאחרים לגלוש ולהשתמש באתר בכל דרך שהיא.',
          ],
        },
      ],
    },
    {
      title: 'השירותים המוצעים באתר',
      content: [
        'השירותים המוצעים על ידי האתר יופיעו ויוצגו בדפי האתר.',
        'האתר שומר לעצמו את הזכות לשנות את מגוון השירותים או להפסיקם או לשנות את מחיר השירותים המוצעים באתר ומחוצה לו, ללא הודעה מוקדמת.',
        'האתר אינו מחויב, בכל דרך שהיא, לקיים מגוון כלשהו של שירותים.',
        'אופן הצגת השירותים וחבילות הקלפים באתר הינו על-פי שיקול דעתו הבלעדי של האתר.',
        'התשלום בגין רכישת שירות באתר יתבצע באמצעות כרטיס אשראי השייך לרוכש או בכל אמצעי תשלום אחר המופיע בעמוד התשלום.',
        'בנוסף להוראות התקנון יחולו גם הוראות תקנון חברת הסליקה או אמצעי התשלום האחר. על אף האמור לעיל, האתר שומר לעצמו את הזכות לקבוע הסדרי תשלומים אחרים לנרשמים, והכל על-פי שיקול דעתו הבלעדי.',
        'הרכישה באתר תבוצע בכפוף לאישור העסקה על ידי חברת האשראי. במקרה בו לא אושרה העסקה על ידי חברת האשראי, המזמין יקבל הודעה וחשבונו לא יחויב בגין העסקה.',
      ],
      subsections: [
        {
          title: 'גישה לערכות קלפים דיגיטליות',
          content: [
            'כל רכישת מנוי באתר מעניקה גישה לתכנים הדיגיטליים בלבד – ללא אספקת מוצר פיזי – לרבות קלפים, תרגולים, מדריכים, שאלות מנחות ועוד. השירות ניתן אונליין בלבד, דרך חשבון אישי באתר. הגישה היא אישית, פרטית, ולא ניתנת להעברה. אין לשתף קישורים, תכנים או גישה עם משתמשים אחרים.',
            'שירותים משלימים וקהילה – לאחר ההצטרפות יוזמן המשתמש להצטרף לקהילת הפייסבוק הפעילה של Mentor Cards. הקהילה מהווה מרחב מקצועי ללמידה, שיתוף, והשראה – וייתכנו בה הצעות לשירותים נוספים בתשלום, מבית Mentor Cards או משותפים מקצועיים.',
            'עם הצטרפות למנוי חודשי או שנתי, החיוב יתבצע אוטומטית בכל מחזור חיוב – עד לביטול. ביטול נכנס לתוקף בסיום תקופת החיוב הנוכחית. לא יינתן החזר עבור שימוש חלקי או חוסר שימוש. הודעת תזכורת לחידוש נשלחת במייל, אך אין התחייבות לכך מצד האתר.',
            'כל גישה לאתר נחשבת רישיון אישי. ארגונים נדרשים לרכוש מנוי נפרד לכל משתמש. אין להעביר גישה בין עובדים או לשתף בין משתמשים שאינם בעלי מנוי אישי.',
          ],
        },
      ],
    },
    {
      title: 'שירותי הקורסים המוצעים באתר',
      content: [
        'המחיר המופיע באתר בצמוד לקורסים הינו המחיר העדכני. המחיר עשוי להשתנות מעת לעת. האתר שומר לעצמו את הזכות לשנות את מגוון השירותים והתכנים או להפסיקם או לשנות את מחיר הקורסים והשירותים המוצעים באתר ומחוצה לו, ללא הודעה מוקדמת.',
        'האתר אינו מחויב, בכל דרך שהיא, לקיים מגוון כלשהו של שירותים ו/או מאמרים ו/או סרטוני הדרכה בקורסים.',
        'אופן הצגת הקורסים והתכנים באתר הינו על-פי שיקול דעתו הבלעדי של האתר.',
      ],
      subsections: [
        {
          title: 'הרשמה לקורס באתר',
          content: [
            'על מנת לרכוש ולצפות בקורסים, האתר דורש הרשמה לאתר.',
            'לאחר ההרשמה ובהתאם לפרטים שהוזנו, לקוחות האתר יקבלו גישה לקורסים באמצעות סיסמה אישית.',
            'בהרשמה לאתר הנך מסכים לשמור את סיסמתך בסודיות, והנך מאשר כי: (1) חשבונך הוא אישי; (2) אתה תהיה האחראי הבלעדי לכל פעולה או שימוש שיעשו מחשבונך; (3) לא תאפשר לאחר גישה לחשבונך; (4) לא תפיץ ו/או תעביר לאחר ו/או בכל אמצעי את התכנים המוצגים בחשבונך.',
            'האתר שומר את זכותו לשנות את שם המשתמש שבחרת או להסיר אותו במידה וייקבע כי שם המשתמש אינו הולם או מגונה, לשיקול דעתו הבלעדי של האתר.',
            'מתן השירות יתאפשר בכפוף לשיקול דעתו הבלעדי של האתר והאתר לא יהא אחראי לכל איחור ו/או עיכוב במתן השירות ו/או אי-מתן השירות, כתוצאה מכוח עליון ו/או תקלות טכניות ו/או מאירועים שאינם בשליטתו, לרבות תקלות טכניות או אחרות אצל צד שלישי.',
            'התשלום בגין הרשמה לקורסים באתר יתבצע באמצעות כרטיס אשראי השייך לנרשם או בכל אמצעי תשלום אחר המופיע בעמוד התשלום.',
            'בנוסף להוראות התקנון יחולו גם הוראות תקנון חברת הסליקה או אמצעי התשלום האחר. על אף האמור לעיל, האתר שומר לעצמו את הזכות לקבוע הסדרי תשלומים אחרים לנרשמים, והכל על-פי שיקול דעתו הבלעדי.',
            'ההרשמה והתשלום באתר יבוצעו בכפוף לאישור העסקה על ידי חברת האשראי. במקרה בו לא אושרה העסקה על ידי חברת האשראי, יקבל הנרשם הודעה וחשבונו לא יחויב בגין העסקה.',
          ],
        },
      ],
    },
    {
      title: 'ביצוע הזמנה',
      content: [
        'יודגש, כי מסירת פרטים כוזבים ביודעין עלולה לעלות כדי עבירה פלילית. נגד מגישי פרטים כוזבים עלולים להינקט צעדים משפטיים אזרחיים ופליליים, לרבות תביעות נזיקין בגין נזקים שיגרמו למפעיל האתר עקב שיבוש הפעלת האתר. כמו כן, המידע שיימסר על ידי המשתמש באתר ישמש בין השאר לשליחת דואר אלקטרוני בנוגע למבצעים מיוחדים או עדכונים באתר.',
        'במעמד ביצוע ההזמנה יבצע האתר בדיקה של אמצעי התשלום שנמסר על ידי הרוכש, ועם קבלת אישור ההזמנה ע"י חברות כרטיסי האשראי תימסר למשתמש הודעה מתאימה כי ההזמנה אושרה. מובהר כי חיוב מבצע הפעולה בגין עלות הפריט הנרכש על ידו, יתבצע מיד עם סיום ביצוע ההזמנה.',
        'עסקת הרכישה תבוצע רק לאחר השלמת תהליך ההזמנה ולאחר שמפעיל האתר יקבל אישור מהגורם הרלוונטי על ביצוע החיוב, בהתאם לנהלי העבודה הקיימים ביניהם. במקרה בו לא אושרה העסקה ע"י חברות האשראי יקבל הלקוח הודעה מתאימה. השלמת עסקת הרכישה מותנית גם בכך שהפריטים המבוקשים קיימים במלאי בעת השלמת הליך ההזמנה.',
        'ההזמנה תרשם במחשבי מפעיל האתר ויישלח אישור בדואר אלקטרוני על ביצוע הפעולה מייד בסמוך לסיום ביצוע עסקת הרכישה על ידי המשתמש באתר. במקרה של אי קבלת הודעת האישור במייל יש לפנות לשירות הלקוחות.',
        'המשתמש באתר יקבל חשבונית עבור ביצוע התשלום לאחר ביצועו לחשבון האמייל אותו הזין במעמד הרכישה.',
        'יובהר ויודגש, משלוח הודעת דואר אלקטרוני בדבר רישום ההזמנה במערכת הממוחשבת של מפעיל האתר אינה מהווה ראיה בדבר השלמת הפעולה ואין במשלוח הודעת הדוא"ל כדי לחייב את מפעיל האתר. מובהר כי רישומי מערכת המחשב של מפעיל האתר הכוללים רישום ממוחשב ואוטומטי של כל הפעולות באתר מהווים ראיה לכאורה.',
        'פרטי ההזמנה כפי שהזין המשתמש בטופס ההזמנה ורישום העסקה במחשבי האתר יהוו ראייה חלוטה וסופית לנכונות העסקה.',
        'במקרה בו לא אושרה העסקה ע״י חברת האשראי, יקבל המשתמש הודעה מתאימה על כך והוא יידרש למסור אמצעי תשלום אחר.',
      ],
    },
    {
      title: 'אספקת מוצרים',
      content: [
        'על מנת להבטיח את ביצוע ההזמנה ביעילות וללא תקלות, יש להקפיד על מסירת כל הפרטים הנדרשים באתר באופן מדויק ועדכני. אם בעת ביצוע ההזמנה יימסרו פרטים שגויים, מפעיל האתר לא יוכל להבטיח שההזמנה תיקלט.',
        'מפעיל האתר אינו אחראי לטיב השירות שניתן לידו ואינו מבטיח תוצאות מכל סוג שהוא.',
        'חבילות הקלפים יישלחו למשתמש בסמוך לאחר ביצוע ההזמנה.',
        'על הלקוח מוטל האחריות לבדוק את אישור ההזמנה שנשלח בדואר האלקטרוני שמסר בכדי לוודא שאין טעות בהזמנה. לא תתקבל כל טענה כי הוזמן משהו שונה מתוכן אישור ההזמנה.',
      ],
    },
    {
      title: 'מדיניות שינויים וביטולים',
      content: [
        'בקשה לשינוי או ביטול שירות תועבר לאתר באחד מאמצעי ההתקשרות המופיעים בתחתית התקנון.',
        'שינוי ו/או ביטול הזמנת שירות וקבלת החזר כספי יתאפשרו בתוך 14 ימים מביצוע העסקה או ממועד קבלת פרטי העסקה (לפי המאוחר) ובהתאם ללוחות הזמנים הבאים:',
        'עד יומיים טרם מועד מתן השירות בהחזר כספי מלא (טרם קבלת המוצרים הדיגיטליים בפועל);',
        'בטווח זמן של פחות מיומיים טרם מועד מתן השירות לא יינתן החזר כספי כלל (מועד מתן השירות הינו מועד התחלת ביצוע העבודה עבור השירות הנרכש, כפי שיובא בעמוד המוצר או בהסכמה בין הצדדים).',
        'בשירות מתמשך (קרי שירות שנרכש ומתחדש כל חודש)– ניתן לבטל בהתאם להוראות חוק הגנת הצרכן.',
        'ההחזר הכספי יעשה באמצעי התשלום שבו ביצע הלקוח את התשלום.',
        'שינוי או ביטול יאושרו לאחר שהלקוח יקבל הודעה מהאתר המאשרת זאת.',
        'האמור בסעיף זה כפוף להוראות ביטול עסקה בהתאם לחוק הגנת הצרכן, התשמ"א-1981.',
      ],
      subsections: [
        {
          title: 'חבילה חודשית',
          content: [
            'ככל ומשתמש מעוניין לבטל חבילה שנרכשה במסגרת "חבילה חודשית" המשולמת מדי חודש, הוא רשאי לעשות זאת בכל עת, ובכפוף לאמור להלן:',
            'ככל שהודעת הביטול תומצא לחברה לא יאוחר מן השעה 23:59 ביום בו בוצעה עסקת הרכישה – המשתמש יזוכה במלוא עלות הרכישה.',
            'ככל שהודעת הביטול תומצא לחברה לאחר המועד הנקוב בסעיף 7.2.4.1 לעיל – הביטול ייכ נס לתוקף בתום החודש הקלנדרי בו ניתנה ההודעה, המשתמש לא יהיה זכאי לזיכוי כלשהו, אך הוא יוכל לעשות שימוש בשירותים שמאפשרת לו חבילת השימוש עד לתום אותו חודש קלנדרי, בכפוף לתנאי חבילת השימוש.',
            'יובהר, כי לא יתקבלו בקשות להחזר כספי בגין חודשים בהם הלקוח לא השתמש במערכת. על הלקוח לבקש את ביטול המנוי בהתאם ובכפוף לאמור להלן.',
          ],
        },
      ],
    },
    {
      title: 'אחריות האתר',
      content: [
        'אין לראות במידע המופיע באתר משום הבטחה לתוצאה כלשהי ו/או אחריות לאופן הפעילויות של השירותים המוצעים בו. האתר לא יהיה אחראי לשום נזק, ישיר או עקיף, אשר ייגרם לגולש כתוצאה מהסתמכות על מידע המופיע באתר ו/או בקישורים לאתרים אחרים ו/או כל מקור מידע פנימי ו/או חיצוני אחר ו/או שימוש בשירותים אשר מוצגים על ידו.',
        'האחריות על שימוש באתר במוצריו ובהשלכות הנובעות מהם הינם באחריות המשתמש בלבד.',
        'המשתמש מצהיר כי השימוש שהוא עושה באתר הוא חוקי ובכל אופן האתר לא יישא בשום אחריות הנובעת משימוש לא נאות במוצרי האתר. המשתמש ישפה את מפעיל האתר בגין כל נזק שייגרם לו, במישרין ובעקיפין וכולל פיצוי בגין פגיעה במוניטין ושם טוב, בגין שימוש לא נאות באתר ושימוש במוצריו לצרכים שאינם חוקיים/ מוסריים.',
        'מידע ומצגים אודות שירותים המוצגים באתר, שמקורו בשותפיו העסקיים של האתר ששירותיהם מופיעים באתר (ככל ויופיעו) וכל תוכן ביחס לשירותים נמצאים באחריותם הבלעדית של השותפים העסקיים כאמור, ועל כן, מובן שלאתר אין כל אחריות בגין מידע מעין זה, ואין האתר ערב למידת הדיוק של מידע זה.',
        'השימוש באתר ייעשה על אחריותו הבלעדית והמלאה של כל גולש. כל החלטה שתתקבל ביחס לתכנים שיתפרסמו באתר הינה באחריותו המלאה של הגולש. האתר אינו מתחייב כי התכנים המתפרסמים באתר, יהיו מלאים, נכונים, חוקיים או מדויקים או יהלמו את ציפיותיו ודרישותיו של כל גולש. האתר לא יישא באחריות כלשהי לכל תוצאה שתנבע מהם, או משימוש בהם, או מהסתמכות עליהם.',
        "האתר לא יהיה אחראי לכל נזק (ישיר או עקיף), הפסד, עגמת נפש והוצאות שייגרמו לגולשים ו/או למשאיר פרטים באתר ו/או לצדדים שלישיים כלשהם בעקבות שימוש או הסתמכות על כל תוכן, מידע, נתון, מצג, תמונה, וידאו, אודיו, פרסומת, מוצר, שירות וכו' המופעים באתר. כל הסתמכות כאמור נעשית על-פי שיקול דעתו ואחריותו הבלעדית של הגולש באתר.",
        'האתר בשום מקרה לא יהיה אחראי לנזק שנגרם לגולש האתר באמצעות יצירת קשר עם שותפיו העסקיים של האתר.',
        'האתר ממליץ לגולשים באתר לנהוג בזהירות, ולקרוא בעיון את המידע המוצג באתר ובכלל זה את המידע ביחס לשירות עצמו, תיאורו והתאמתו, כמתואר להלן.',
        'האתר בכללותו, לרבות כל המידע המופיע בו, מוצע לציבור כמות שהוא, ויהיה מדויק ונכון ככל הניתן, ואולם, יתכן והמידע אינו שלם או לחלופין, יתכן ונפלו טעויות טכניות או אחרות במידע.',
        'השימוש באתר ייעשה על אחריותו הבלעדית והמלאה של כל גולש. האתר אינו מתחייב כי תכנים ושירותים המתפרסמים באתר, יהיו מלאים, נכונים, חוקיים או מדויקים או יהלמו את ציפיותיו ודרישותיו של כל גולש. האתר לא יישא באחריות כלשהי לכל תוצאה שתנבע מהם, או משימוש בהם, או מהסתמכות עליהם, לרבות: (1) שגיאות, טעויות ואי-דיוקים; (2) נזק לגוף או לרכוש, מכל סוג, הנגרם עקב השימוש באתר ו/או בשירותי האתר; (3) הפרעה בגישה לאתר או מהאתר; (4) כל באג, וירוס, סוסי טרויאני וכיו״ב שעלולים להיות מועברים לאתר על ידי צד שלישי כלשהו.',
      ],
    },
    {
      title: 'פעילות אסורה באתר',
      content: [
        'אינך רשאי להשתמש באתר אלא למטרות שלשמן הוא נועד. השימוש באתר מותר למטרות פרטיות ואישיות בלבד ואין לעשות בו שימוש למטרות מסחריות למעט כאלו שיאושרו על ידי האתר באופן ספציפי.',
        'כמשתמש האתר, אתה מסכים שלא לאחזר נתונים או תוכן אחר מהאתר כדי ליצור או להרכיב אוסף, מסד נתונים או מדריך ללא אישור מראש ובכתב מהאתר;',
        'לעשות כל שימוש בעיצובי האתר;',
        'לעשות שימוש לא מורשה באתר, לרבות איסוף כתובות דוא"ל וכיו״ב באמצעים אלקטרוניים או אחרים לצורך שליחת דוא"ל באמצעים אוטומטיים;',
        'לעקוף, להשבית או להפריע בדרך אחרת לאבטחה האתר, לרבות שימוש ביישומים המונעים או מגבילים את השימוש או ההעתקה של תוכן כלשהו;',
        'להונות או להטעות את האתר ו/או את משתמשיו;',
        'לעשות שימוש לא נכון בשירותי התמיכה של האתר או להגיש דוחות כוזבים בנוגע לשימוש באתר;',
        'לעשות שימוש אוטומטי במערכת, כגון שימוש בסקריפטים לשליחת הערות או הודעות, או שימוש בכריית נתונים, רובוטים או כלי איסוף וחילוץ נתונים דומים;',
        'לנסות להתחזות לאדם אחר;',
        'להשתמש במידע שהתקבל באתר על מנת להטריד, להתעלל או לפגוע באדם אחר;',
        'להשתמש באתר כחלק מכל מאמץ להתחרות באתר;',
        'לאחזר, לפענח או להנדס לאחור חלק מהאתר, אפשרות באתר או יישום באתר;',
        'להטריד, להפחיד או לאיים על כל אחד מעובדי או סוכני האתר;',
        'למחוק את זכויות היוצרים או את הודעת הזכויות הקנייניות מכל תוכן או סימן;',
        'להעתיק או להתאים את קוד האתר או חלק ממנו, כולל אך לא רק, HTML, Java Script, PHP, CSS, JSON או קוד אחר;',
        'להעלות או להעביר (או לנסות להעלות או להעביר) וירוסים, סוסים טרויאניים, או חומר אחר, כולל שימוש בדואר זבל, אשר יפריע לשימוש באתר;',
        'לבצע פעולה שתפגע או תזיק לאתר, בהתאם לשיקול דעתו של האתר;',
        'להשתמש באתר באופן שאינו עולה בקנה אחד החוק, התקנות והפסיקה.',
        'אין לקשר לתכנים מהאתר, שאינם דף הבית של האתרים ("קישור עמוק") ואין להציג, או לפרסם תכנים כאמור בכל דרך אחרת, אלא אם הקישור העמוק יהיה לדף אינטרנט באתר במלואו וכפי שהוא (AS IS) כך שניתן יהיה לצפות ולהשתמש בו באופן הזהה לחלוטין לשימוש ולצפייה בו באתר.',
        'האתר רשאי לדרוש ביטול כל קישור עמוק כאמור לפי שיקול דעתו הבלעדי ובמקרה זה לא תעמוד כל טענה, דרישה או תביעה כלפי האתר בעניין זה.',
        'האתר לא יישא בכל אחריות לכל נזק שייגרם כתוצאה מכל קישור לתכנים מהאתר ומכל הצגה או פרסום של תכנים כאמור בכל דרך אחרת. האחריות המלאה והבלעדית לכל קישור, הצגה או פרסום של התכנים, היא על מבצע הקישור בלבד.',
        'כל שימוש באתר תוך הפרה של האמור לעיל עלול לגרום, בין היתר, לסיום או השעיית זכויותיך לשימוש באתר.',
      ],
    },
    {
      title: 'תוכן צדדים שלישיים',
      content: [
        'האתר רשאי להשתמש בקישורים לאתרים אחרים ("אתרי צד שלישי") וכן במאמרים, תמונות, טקסט, גרפיקה, תמונות, עיצובים, מוסיקה, סאונד, וידאו, מידע, אפליקציות, תוכנה ותכנים או פריטים אחרים השייכים או שמקורם באתרי צד שלישי ("תוכן של צד שלישי").',
        'האתר לא לוקח אחריות על כל רכישה שתבצע מאתרי צד שלישי או מחברות אחרות אשר יבוצעו ויהיו בתוקף באופן בלעדי בינך לבין הצד השלישי הרלוונטי.',
      ],
    },
    {
      title: 'השימוש באתר',
      content: [
        'השימוש באתר מותר למטרות פרטיות ואישיות בלבד. אין להעתיק ולהשתמש או לאפשר לאחרים להשתמש, בכל דרך אחרת בתכנים מתוך האתר, לרבות באתרי אינטרנט אחרים, בפרסומים אלקטרוניים, בפרסומי דפוס וכיו"ב, לכל מטרה, בין מסחרית ובין שאינה מסחרית, שאיננה לצורך שימוש אישי ופרטי, למעט בכפוף לקבלת אישור ו/או הסכמה מפורשת מראש ובכתב.',
        'אין להפעיל או לאפשר להפעיל כל יישום מחשב או כל אמצעי אחר, לרבות תוכנות מסוג Crawlers Robots וכדומה, לשם חיפוש, סריקה, העתקה או אחזור אוטומטי של תכנים מתוך האתר.',
        'אין להציג תכנים מהאתר בכל דרך שהיא ובכלל זה באמצעות כל תוכנה, מכשיר, אביזר או פרוטוקול תקשורת המשנים את עיצובם באתר או מחסירים מהם תכנים כלשהם ובפרט פרסומות ותכנים מסחריים.',
        'אין לקשר לאתר מכל אתר המכיל תכנים פורנוגראפיים, תכנים המעודדים לגזענות או להפליה פסולה, או המנוגדים לחוק, או שפרסומם מנוגד לחוק או המעודדים פעילות המנוגדת לחוק.',
        'על הגולש לשפות את האתר, עובדיו, מנהליו, שותפיו העסקיים או מי מטעמו בגין כל נזק, הפסד, אבדן רווח, תשלום או הוצאה שייגרמו להם - ובכלל זה שכ"ט עו"ד והוצאות משפט עקב הפרת תקנון זה.',
      ],
    },
    {
      title: 'שינויים באתר, תקלות והפסקות שירות',
      content: [
        'מבלי לגרוע מהאמור לעיל, האתר יוכל לשנות מעת לעת את מבנה האתר, ו/או המראה ו/או העיצוב של האתר, את היקפם וזמינותם של השירותים באתר, יהיה רשאי לגבות תשלום בעד תכנים ושירותים כאלה או אחרים על פי החלטתו.',
        'שינויים כאמור יבוצעו, בין השאר, בהתחשב באופי הדינאמי של רשת האינטרנט ובשינויים הטכנולוגיים והאחרים המתרחשים בה. מטבעם, שינויים מסוג זה עלולים להיות כרוכים בתקלות ו/או לעורר בתחילה אי נוחות וכיו"ב.',
        'האתר אינו מתחייב ששירותי האתר לא יופרעו, יינתנו כסדרם או בלא הפסקות, יתקיימו בבטחה וללא טעויות ויהיו חסינים מפני גישה בלתי מורשית למחשבי האתר או מפני נזקים, קלקולים, תקלות או כשלים - והכל, בחומרה, בתוכנה, בקווי ובמערכות תקשורת אצל האתר או אצל מי מספקיו.',
      ],
    },
    {
      title: 'קניין רוחני',
      content: [
        'כל זכויות היוצרים והקניין הרוחני הם בבעלות האתר בלבד, או בבעלות צד שלישי, שהרשה לאתר לעשות שימוש על פי דין בתכנים אלו ובכלל זה שותפיה העסקיים של האתר.',
        'אין להעתיק, להפיץ, להציג בפומבי, לבצע בפומבי, להעביר לציבור, לשנות, לעבד, ליצור יצירות נגזרות, למכור או להשכיר כל חלק מן הנ"ל, בין ישירות ובין באמצעות או בשיתוף צד שלישי, בכל דרך או אמצעי בין אם אלקטרוניים, מכאניים, אופטיים, אמצעי צילום או הקלטה, או בכל אמצעי ודרך אחרת, בלא קבלת הסכמה בכתב ומראש מהאתר או מבעלי הזכויות האחרים, לפי העניין.',
        'אם וככל שניתנה הסכמה כאמור, יש להימנע מלהסיר, למחוק או לשבש כל הודעה או סימן בעניין זכויות קניין רוחני, לדוגמה: סימון זכויות היוצרים ,© או סימן מסחר ®, הנלווים לתכנים שיעשה בהם שימוש.',
        'סימני המסחר, צילומים, תמונות תכנים ומודעות הפרסומת של שותפיה העסקיים של האתר הינם קניינם של מפרסמים אלה בלבד. גם בהם אין לעשות בהם שימוש בלא הסכמת המפרסם מראש ובכתב.',
      ],
    },
    {
      title: 'סמכות שיפוט',
      content: [
        'על תקנון זה יחולו אך ורק דיני מדינת ישראל, אולם לא תהיה תחולה לכללי ברירת הדין הבינלאומי הקבועים בהם.',
        'לבתי המשפט במחוז השיפוט של ישראל תהיה סמכות שיפוט ייחודית בכל עניין הנובע ו/או הקשור לתקנון זה.',
      ],
    },
  ];

  siteRulesContentEn: SiteRulesSection[] = [
    {
      title: 'General Terms',
      content: [
        'Your use of the Website is subject to the terms and conditions set forth herein (the "Terms"). Please read them carefully, as accessing and using the Website constitutes your agreement to these Terms. The Website reserves the right to modify the Terms at any time without prior notice. Such modifications shall take effect upon their publication on the Website.',
        'These Terms apply equally to all genders; use of masculine or feminine language is for convenience only.',
        'These Terms apply to use of the Website and its content on any device (e.g., mobile phones, tablets, etc.) and through any communication network (e.g., the internet, mobile networks, etc.).',
        'Browsing the Website is permitted at any age. However, actions by minors under 18 require parental or guardian approval.',
        "If a user knowingly provides false information or performs actions that disrupt the Website's operations or cause harm to the Site Operator, the user will bear full liability and be required to indemnify the Site Operator.",
        'Instructional videos, images, and product presentations are for illustration purposes only and do not bind the Site Operator.',
        'If any provision in these Terms is found unenforceable or invalid, it shall not affect the validity and enforceability of the remaining provisions.',
      ],
    },
    {
      title: 'Website Use',
      content: [
        'Browsing the Website does not require registration and is open to all visitors.',
        'When submitting personal details, such as name, phone number, and email address, users acknowledge that providing this information is not mandatory by law, but is required to use certain Services. Incorrect details may hinder proper use.',
        'The Website will use the information provided only in accordance with the Privacy Policy, which is an integral part of these Terms.',
        'Submitting contact information constitutes consent to receive marketing content and updates via the communication channels provided, per the Privacy Policy.',
        'The Website may set identification methods for accessing certain features, including login via Facebook, other social media, or other platforms.',
        'The Website reserves the right to block any user, at its sole discretion. Reasons may include:',
      ],
      subsections: [
        {
          title: 'Access Blocking Cases',
          content: [
            'Submission of false information',
            'Illegal or potentially illegal activity',
            'Violation of these Terms',
            'Competing with the Website',
            "Disrupting others' use of the Website",
          ],
        },
      ],
    },
    {
      title: 'Services Offered on the Website',
      content: [
        'Services will be displayed on Website pages.',
        'The Website reserves the right to change or discontinue services or their pricing without prior notice.',
        'There is no obligation to offer any specific range of services.',
        'Presentation of services and card sets is at the sole discretion of the Website.',
        'Payment is made via credit card or other accepted payment methods on the checkout page.',
        'Payment processing terms of the payment provider also apply. The Website reserves the right to set alternative payment arrangements at its discretion.',
        'Orders are subject to approval by the credit card company. If not approved, the order will not be processed.',
      ],
      subsections: [
        {
          title: 'Access to Digital Card Sets',
          content: [
            'Subscription grants access to digital content only (cards, exercises, guides, prompts, etc.) via a personal online account. Access is private and non-transferable. Sharing links or content is prohibited.',
            'Users may be invited to join the active Mentor Cards Facebook community, where additional paid services may be offered.',
            'Subscriptions (monthly/annual) are billed automatically. Cancellation takes effect at the end of the current billing period. No refunds for partial use. Reminder emails may be sent but are not guaranteed.',
            'Each user license is personal. Organizations must purchase separate licenses per user. Sharing access is not allowed.',
          ],
        },
      ],
    },
    {
      title: 'Online Courses',
      content: [
        'Prices shown next to each course are current and may change.',
        'The Website does not guarantee any specific range of courses, articles, or tutorials.',
        "Course presentation is at the Website's discretion.",
      ],
      subsections: [
        {
          title: 'Course Registration',
          content: [
            'To purchase and view courses, registration is required.',
            'After registering, users receive access via a personal password.',
            'Users must keep passwords confidential and agree: (1) Account is personal; (2) They are responsible for account use; (3) They will not share account access; (4) They will not share course content.',
            'The Website may change or remove usernames it deems inappropriate.',
            'Service provision is at the sole discretion of the Website. Delays or failures due to technical or force majeure events will not be held against it.',
            'Payment for courses is via credit card or other accepted methods.',
            'Terms of payment providers apply. The Website may set alternative payment arrangements.',
            'Registration and payment are subject to transaction approval. If declined, the user will be notified.',
          ],
        },
      ],
    },
    {
      title: 'Orders',
      content: [
        'Knowingly providing false information may constitute a criminal offense. Legal action may be taken.',
        'Upon order, the payment method is verified, and if approved, the user receives confirmation. Charges apply upon confirmation.',
        'Orders are valid only if items are in stock and approved by the payment processor.',
        'Confirmation is sent by email. If not received, contact support.',
        'An invoice is emailed to the address provided.',
        "Confirmation email is not binding proof of order completion. The Website's internal records serve as primary evidence.",
        'Order details as entered and stored on the Website are final.',
        'If declined by the payment processor, users must provide a valid alternative method.',
      ],
    },
    {
      title: 'Product Delivery',
      content: [
        'Accurate information must be provided to ensure proper order processing.',
        'The Website is not responsible for results or service outcomes.',
        'Card sets are shipped shortly after the order is placed.',
        "It is the user's responsibility to verify the email confirmation. Claims for incorrect orders will not be accepted.",
      ],
    },
    {
      title: 'Cancellation and Changes',
      content: [
        'Requests for changes or cancellations must be sent via the contact methods listed below.',
        'Cancellations and refunds are available within 14 days of purchase, subject to the following:',
        'Full refund if requested at least 2 days before the service starts',
        'No refund if requested within 2 days of the service start date',
        'Ongoing subscriptions can be canceled according to the Consumer Protection Law',
        'Refunds will be issued using the original payment method.',
        'Cancellation is effective only after confirmation is received from the Website.',
        'The above is subject to the Consumer Protection Law provisions.',
      ],
      subsections: [
        {
          title: 'Monthly Subscription',
          content: [
            'Monthly subscriptions can be canceled at any time, subject to the following:',
            'Full refund if canceled by 23:59 on the purchase date',
            'Otherwise, the cancellation takes effect at the end of the current billing month, with no refund for that month',
            'No refunds are given for unused months.',
          ],
        },
      ],
    },
    {
      title: 'Website Liability',
      content: [
        'No guarantee is made regarding results or service outcomes.',
        'Use of the Website and services is at your own risk.',
        'Any misuse of the Website may result in liability and indemnification.',
        'Third-party information is the sole responsibility of the provider.',
        'The Website is not responsible for content accuracy, completeness, legality, or suitability.',
        'No liability is assumed for any damages resulting from use or reliance on Website content.',
        'The Website is not liable for user interaction with third-party partners.',
        'Users should exercise caution and verify service details independently.',
        'Content is provided "as-is" and may contain errors.',
        'The Website is not responsible for technical issues or viruses.',
      ],
    },
    {
      title: 'Prohibited Conduct',
      content: [
        'The Website is for personal use only. Commercial use requires explicit permission.',
        'Users agree not to harvest data or compile databases',
        'Misuse site design or content',
        'Engage in unauthorized access or impersonation',
        'Circumvent security features',
        'Violate intellectual property or distribute viruses',
        "Compete with the Website or interfere with others' use",
        'Use automated scripts or bots',
        'Deep linking or framing of content is not permitted without written approval.',
        'The Website may require removal of unauthorized links.',
        'The Website is not liable for damages caused by external links.',
      ],
    },
    {
      title: 'Third-Party Content',
      content: [
        'The Website may feature links or content from third parties. The Website is not responsible for this content or its accuracy.',
        'Purchases or agreements with third parties are between the user and the provider.',
      ],
    },
    {
      title: 'Website Use Guidelines',
      content: [
        'The Website is for personal use only. Content may not be copied, distributed, altered, or reused without written permission.',
        'Automated tools or bots are not permitted.',
        "Content must not be displayed in ways that alter the Website's design or remove commercial content.",
        'Linking from sites with inappropriate content is prohibited.',
        'Users must indemnify the Website for any violations of these Terms.',
      ],
    },
    {
      title: 'Website Changes and Service Interruptions',
      content: [
        'The Website may change its structure, design, or services at any time.',
        'Changes may result in temporary disruptions or inconvenience.',
        'The Website does not guarantee uninterrupted service or security from technical issues.',
      ],
    },
    {
      title: 'Intellectual Property',
      content: [
        'All intellectual property on the Website belongs to the Website or its partners.',
        'Content may not be copied, distributed, altered, or reused without written permission.',
        'Copyright markings may not be removed or altered.',
        'Trademarks and partner materials remain their property.',
      ],
    },
    {
      title: 'Jurisdiction',
      content: [
        'These Terms are governed by the laws of the State of Israel.',
        'Jurisdiction lies exclusively with the courts in Israel.',
      ],
    },
  ];

  privacyPolicyContentHe: SiteRulesSection[] = [
    {
      title: 'מדיניות פרטיות',
      content: [
        'האתר מכבד את פרטיות הלקוחות.',
        'על מנת לספק שירות איכותי, אנו עשויים להשתמש בנתונים האישיים שלך, ובין היתר, מידע על השימוש שלך באתר ומידע על המכשיר הנייד שלך או המחשב ("המידע הנאסף באתר"). המידע הנאסף באתר עשוי לשמש את האתר לצרכים הבאים: לספק לך שירותים ולשפר את האתר ו/או את השירותים; תפעולו התקין של האתר; לנתח את ולנהל את האתר באופן תקין; שיפור שירות הלקוחות של האתר; ליצירת קשר או לספק לך נתונים בקשר לאתר או לשירות.',
        'בעת השימוש באתר, האתר עשוי לאסוף מידע מסוים באופן אוטומטי. לדוגמה: כתובת ה- IP שלך, פרוטוקול האינטרנט, ספק האינטרנט או הדפדפן וסוג המכשיר ממנו אתה גולש; הקלטת הפעילות שלך באתר או תרשים העמודים בהם ביקרת; שימוש בעוגיות על מנת לזהות את המכשיר ממנו אתה גולש; מידע שתזין, תשתף או שניתן להשיג מהשימוש שלך באתר.',
        'אנו עשויים לשתף את המידע האישי שלך (למעט מידע רגיש כגון פרטי אשראי ומספרי תעודות זהות) עם צדדים שלישיים, כולל עם שותפינו העסקיים ונותני שירותים.',
        'דוגמאות לפעולות שנותני שירותים עשויים לבצע הכרוכים במידע שלך: לפתח ולתחזק את האתר; לצבור מידע על לקוחות ו/או גולשים ולשפר את שירות הלקוחות; שיתוף רשתות חברתיות כגון פייסבוק, אינסטגרם ואחרות ומפרסמים נוספים ברשת כגון גוגל, טאבולה ואחרים; לצרכים סטטיסטים.',
        'במידה והאתר ימוזג לתוך פעילות גוף אחר או אם האתר יעבור לבעלות תאגיד אחר ניתן יהיה להעביר לתאגיד החדש את המידע הקיים באתר, אבל רק במקרה שהתאגיד יתחייב לשמור על תנאי תקנון זה.',
        'לנותני שירותים ושותפים עסקיים כאמור ניתנת גישה לכל או לחלק מהמידע שלך, והם עשויים להשתמש בעוגיות (כהגדרתן לעיל) או בטכנולוגיית איסוף אחרות.',
        'חשוב לזכור שלא ניתן לערוב במאת האחוזים מפני פעילות עוינת ונחושה מצד גורמים זרים ולכן אין בפעולות אלה בטחון מוחלט והאתר לא מתחייב שהשירותים באתר יהיו חסינים באופן מוחלט מפני גישה בלתי מורשית למידע הנאסף בו.',
      ],
    },
    {
      title: 'הרשאה לדיוור, פרסומים ופרסומת',
      content: [
        'גולש שהשאיר פרטים באתר ומצורף לרשימת הדיוור של האתר, מאשר שימוש בפרטיו לצורך קבלת מידע שיווקי, עדכונים ופרסומות שיבצע האתר מעת לעת.',
        'על גולש שהשאיר פרטים כאמור תחולנה הוראות הדיוור המפורטות בתקנון להלן.',
        'אין להשאיר פרטים של אדם אחר באתר שלא בהסכמתו ו/או ללא נוכחותו מול המסך בשעת השארת הפרטים ולאחר שהוסברו לו כל תנאי התקנון.',
        'בעת השארת הפרטים יתבקש הגולש למסור פרטים אישיים כגון: שם פרטי, שם משפחה, וכן כתובת דואר אלקטרוני פעילה. מסירת פרטים חלקיים או שגויים עלולים למנוע את האפשרות להשתמש בשירות ולסכל יצירת קשר במקרה הצורך.',
        'מובהר כי אין חובה על-פי חוק למסור פרטים באתר, אולם בלא למוסרם לא ניתן יהיה לקבל תוכן שיווקי ועדכונים מהאתר.',
        'האתר לא יעשה בפרטים שנמסרו שימוש, אלא בהתאם למדיניות הפרטיות של האתר המהווה חלק בלתי נפרד מהתקנון.',
        'השארת פרטים באתר ואישור לקבלת תוכן שיווקי כוללת, בין היתר, קבלת תוכן שיווקי, מידע ביחס למבצעים, עדכונים והנחות המוצעים למשתמשים רשומים.',
        'אישור דיוור (קבלת תוכן שיווקי) כאמור, מהווה את הסכמתו של הגולש למשלוח דברי פרסומת על-פי חוק התקשורת (בזק ושידורים) (תיקון מס\' 40) התשס"ח – 2008 ("חוק התקשורת").',
        'מובהר כי באפשרות משאיר הפרטים להסיר עצמו בכל עת מהדיוור באמצעות לחיצה על "להסרה מרשימת התפוצה" שמופיע בתחתית כל דיוור שנשלח או באמצעות פנייה בדוא"ל לאתר.',
        'אין לראות במידע בדיוור משום הבטחה לתוצאה כלשהי ו/או אחריות לשירות המוצע בו.',
        'הדיוור בכללותו, לרבות כל המידע המופיע בו, מוצע כמות שהוא, ויהיה מדויק ונכון ככל הניתן, ואולם, יתכן והמידע אינו שלם או לחלופין, יתכן ונפלו טעויות טכניות או אחרות במידע.',
        'הגולש מאשר כי לא תהיה לו כל טענה בקשר למודעות פרסום ו/או פרסומות המוצגות באתר, לרבות בקשר למיקומן באתר. מובהר כי בכל הנוגע למודעות פרסום המוצגות בחסות צד שלישי, לאתר אין כל התערבות בבחירת הפרסומות המוצגות, אמיתות תוכנן וסדר הופעתן.',
      ],
    },
    {
      title: 'נהלי אבטחה',
      content: [
        'מפעיל האתר משתמש בתקני אבטחה גבוהים על מנת לשמור ככל האפשר על סודיות המידע ופרטיות לקוחותיה.',
        'האתר עושה שימוש במערכות תוכנה מתקדמות ובנהלי אבטחה מחמירים במטרה למזער סיכוני חדירה למערכותיה ולמזער חשיפה לא מורשית למאגרי המידע שבבעלותה.',
        'האתר מאובטח באמצעות פרוטוקול SSL, כלומר כל התקשורת שבין הדפדפן (אצל הלקוח) לאתר (כלומר שרת האינטרנט המאחסן את העמודים) הינה מוצפנת כך שלא ניתן לפענח את המידע המועבר בין הדפדפן לאתר.',
        'במקרים שאינם בשליטה ו/או נובעים מכוח עליון, מפעיל האתר לא יישא באחריות לכל נזק מכל סוג שהוא, עקיף או ישיר שיגרם למשתמש ו/או למי מטעמו, אם מידע יאבד או יגיע לגורם עוין ו/או יעשה בו שימוש שלא בהרשאה.',
        'מפעיל האתר עושה מאמץ לספק למשתמש שירות תקין ובאיכות גבוהה. יחד עם זאת, מפעיל האתר אינו מתחייב שהשירות באתר לא יופרע, יינתן כסדרו או בלא הפסקות, יתקיים בבטחה וללא טעויות.',
        'המידע עליך מאוחסן במאגרי מידע המנוהלים על ידי מפעיל האתר ו/או על ידי צד שלישי מטעמה בכפוף לתקנות הגנת הפרטיות (אבטחת מידע), התשע"ז-2017. מידע רגיש, כגון סיסמאות, נשמר במאגרי המידע בצורה מוצפנת. מאגרי המידע עשויים להימצא מחוץ לגבולות מדינת ישראל.',
      ],
    },
    {
      title: 'הזכות לעיון במידע',
      content: [
        'לפי חוק הגנת הפרטיות, התשמ"א-1981, הינך רשאי לעיין במידע עליך המוחזק במאגרי המידע של האתר. באם תמצא כי המידע עליך אינו נכון, שלם, ברור או מעודכן, הינך רשאי לפנות לחברה בבקשה לתקן את המידע עליך או למוחקו.',
        'כל פנייה שלך לחברה בנוגע לעיון במידע עליך ו/או שינויו, תעשה בכתב לפי הפרטים המופיעים בעמוד יצירת הקשר באתר. מחובתך לוודא כי פנייתך הגיעה לחברה ומטופלת על ידה.',
        'אם לדעתך האתר פוגע בפרטיות המשתמשים בו ככלל, או בפרטיותך כפרט, אנא פנה לחברה בכתב לפי הפרטים המופיעים בעמוד יצירת הקשר באתר.',
      ],
    },
    {
      title: 'שימוש במידע',
      content: [
        "בפרטים אישיים שנמסרו לנו דרך האתר שלנו ייעשה שימוש למטרות שצוינו במדיניות זו, או בעמודים הרלוונטיים שבאתר. ייתכן שנשתמש בפרטים האישיים שלכם למטרות הבאות: ניהול האתר; שליחת דיוור ישיר על ידי תוכנות דיוור ככל שהמשתמש אישר קבלת דיוור ישיר; שליחת מוצרים ו/או אספקת שירותים שרכשתם דרך האתר; אספקה של מידע סטטיסטי בנוגע למשתמשים שלנו לצד ג'; פרסום (ובין היתר, Remarketing) - העברת המידע לצדדים שלישיים (גוגל, פייסבוק ועוד) לטובת קידום האתר; טיפול בבירורים ותלונות; שמירת האתר מאובטח ומניעת הונאות; אימות של היענות לתנאי השירות.",
        'האתר מתחייב שלא לעשות כל שימוש בפרטים של לקוחותיה הרשומים באתר אלא לצרכיו של תפעול האתר ועל מנת לאפשר לבצע את ההזמנה על הצד הטוב ביותר ועל מנת להעביר מידע ללקוחות.',
        'מפעיל האתר מתחייב כי לא יעשה שימוש בפרטי המשתמשים הרשומים באתר אלא לצרכי תפעול האתר בלבד ועל מנת לאפשר את ביצוע קבלת האינפורמציה וכן, לצורך שמירת קשר עם המשתמש.',
        'מפעיל האתר עשוי לעשות שימוש ב"עוגיות", המוכרות גם כ-"Cookies", על המחשבים של המשתמשים ועל מכשירי המובייל. מדובר בנוהל סטנדרטי הנהוג בקרב כל חנויות האינטרנט.',
        'מפעיל האתר מייחס חשיבות עליונה לאבטחת המידע של לקוחותיה, כל מידע המתקבל באתר, בין אם נמסר על-ידי הלקוח ובין אם נאסף על-ידי Cookie בעת שימוש באתר, הוא לשימוש בלעדי של אתר (כפוף למתן הסכמת הלקוח להיכלל ברשימת התפוצה של האתר).',
        'למרות האמור לעיל, מפעיל האתר יהא רשאי להעביר פרטיו האישיים של משתמש לצד שלישי במקרים בהם המשתמש ביצע מעשה או מחדל הפוגעים ו/או העלולים לפגוע במפעיל האתר ו/או בצדדים שלישיים כלשהם.',
        'שימוש בטכנולוגיות פרסום וקידום ממומן: האתר עושה שימוש בטכנולוגיות צד שלישי, לרבות Google Ads, Facebook Pixel, Taboola, Outbrain, Mixpanel ושירותים דומים, לצורך ניתוח תעבורת האתר, מדידת אפקטיביות קמפיינים והצגת תוכן שיווקי מותאם אישית (רימרקטינג). מידע זה נאסף באמצעות עוגיות (Cookies) ונתוני גלישה, ועשוי לכלול בין היתר את כתובת ה-IP, העמודים שבהם ביקרת באתר, משך השהייה ופעולות שבוצעו. השימוש בכלים אלה מתבצע בהתאם להוראות החוק, ובכפוף למדיניות הפרטיות של השירותים החיצוניים. כל משתמש רשאי לשנות את הגדרות הדפדפן שלו כך שיחסום עוגיות – אך ייתכן שזה יפגע בחוויית השימוש באתר.',
      ],
    },
  ];

  privacyPolicyContentEn: SiteRulesSection[] = [
    {
      title: 'Privacy Policy',
      content: [
        'Mentor Cards values and respects your privacy.',
        'To provide quality service, we may use your personal data, including information about your use of the Website and your mobile device or computer ("Information Collected on the Website"). This information may be used for: providing and improving services; proper operation of the Website; analyzing and managing the Website; improving customer service; contacting you or providing data related to the Website or services.',
        'When using the Website, certain information may be collected automatically, such as: your IP address, internet protocol, internet provider, browser and device type; recording your activity on the Website or pages visited; use of cookies to identify your device; information you enter, share, or obtain from your use of the Website.',
        'We may share your personal information (except sensitive information such as credit details and ID numbers) with third parties, including business partners and service providers.',
        'Examples of activities that service providers may perform involving your information include: developing and maintaining the Website; collecting customer information and improving customer service; social media sharing such as Facebook, Instagram and others, and additional network advertisers such as Google, Taboola and others; statistical purposes.',
        'If the Website merges into another entity or is transferred to another corporation, existing information on the Website may be transferred to the new corporation, but only if the corporation commits to maintaining the terms of this regulation.',
        'Service providers and business partners may have access to all or part of your information and may use cookies or other collection technologies.',
        "It's important to remember that absolute security cannot be guaranteed against hostile and determined activity by foreign elements, so these actions do not provide absolute security and the Website does not guarantee that services on the Website will be absolutely immune from unauthorized access to information collected therein.",
      ],
    },
    {
      title: 'Mailing and Consent',
      content: [
        'Users who submit details on the Website and join the mailing list authorize use of their details for receiving marketing information, updates and advertisements from the Website.',
        'Users who submit details as mentioned are subject to the mailing provisions detailed in the regulations below.',
        'Details of another person may not be submitted on the Website without their consent and/or without their presence at the screen when submitting details and after all regulation terms have been explained to them.',
        'When submitting details, users will be asked to provide personal information such as: first name, last name, and active email address. Providing partial or incorrect details may prevent the ability to use the service and frustrate contact when needed.',
        'It is clarified that there is no legal obligation to provide details on the Website, but without providing them it will not be possible to receive marketing content and updates from the Website.',
        "The Website will not use the details provided except in accordance with the Website's privacy policy which is an integral part of the regulations.",
        'Submitting details on the Website and approving receipt of marketing content includes, among other things, receiving marketing content, information regarding promotions, updates and discounts offered to registered users.',
        'Mailing approval (receiving marketing content) as mentioned constitutes the user\'s consent to sending advertisements according to the Communications Law (Telecommunications and Broadcasting) (Amendment No. 40) 2008 ("Communications Law").',
        'It is clarified that the person submitting details can remove themselves from mailing at any time by clicking "remove from mailing list" at the bottom of each mailing sent or by emailing the Website.',
        'The information in mailings should not be seen as guaranteeing any result and/or responsibility for the service offered therein.',
        'The mailing as a whole, including all information appearing in it, is offered as is, and will be accurate and correct as much as possible, however, the information may be incomplete or alternatively, technical or other errors may have occurred in the information.',
        'The user confirms that they will have no claim regarding advertisements and/or advertisements displayed on the Website, including regarding their location on the Website. It is clarified that regarding advertisements displayed under third-party sponsorship, the Website has no intervention in selecting the advertisements displayed, the truthfulness of their content and the order of their appearance.',
      ],
    },
    {
      title: 'Security Procedures',
      content: [
        'The Website operator uses high security standards to maintain confidentiality of information and customer privacy as much as possible.',
        'The Website uses advanced software systems and strict security procedures to minimize penetration risks to its systems and minimize unauthorized exposure to information databases in its possession.',
        'The Website is secured using SSL protocol, meaning all communication between the browser (at the customer) and the Website (i.e., the web server hosting the pages) is encrypted so that information transferred between the browser and Website cannot be deciphered.',
        'In cases beyond control and/or resulting from force majeure, the Website operator will not be responsible for any damage of any kind, indirect or direct that will be caused to the user and/or anyone on their behalf, if information is lost or reaches a hostile factor and/or is used without authorization.',
        'The Website operator makes an effort to provide the user with proper and high-quality service. However, the Website operator does not guarantee that the service on the Website will not be disrupted, will be provided in order or without interruptions, will take place securely and without errors.',
        'Information about you is stored in information databases managed by the Website operator and/or by a third party on its behalf subject to Privacy Protection Regulations (Information Security), 2017. Sensitive information, such as passwords, is kept in information databases in encrypted form. Information databases may be located outside the borders of the State of Israel.',
      ],
    },
    {
      title: 'Right to Review Information',
      content: [
        "According to the Privacy Protection Law, 1981, you are entitled to review information about you held in the Website's information databases. If you find that the information about you is not correct, complete, clear or updated, you are entitled to contact the company with a request to correct or delete the information about you.",
        'Any inquiry you make to the company regarding reviewing information about you and/or changing it will be made in writing according to the details appearing on the contact page on the Website. It is your responsibility to ensure that your inquiry reached the company and is being handled by it.',
        'If you believe the Website harms the privacy of its users in general, or your privacy in particular, please contact the company in writing according to the details appearing on the contact page on the Website.',
      ],
    },
    {
      title: 'Use of Information',
      content: [
        'Personal details provided to us through our Website will be used for the purposes specified in this policy, or on relevant pages on the Website. We may use your personal details for the following purposes: Website management; sending direct mail via mailing software if the user approved receiving direct mail; sending products and/or providing services purchased through the Website; providing statistical information about our customers to third parties; advertising (including Remarketing) - transferring information to third parties (Google, Facebook and others) for Website promotion; handling inquiries and complaints; keeping the Website secure and preventing fraud; verifying compliance with service terms.',
        'The Website undertakes not to use details of its customers registered on the Website except for Website operation needs and to enable order execution in the best way and to transfer information to customers.',
        'The Website operator undertakes that it will not use details of users registered on the Website except for Website operation needs only and to enable receiving information and also, for maintaining contact with the user.',
        'The Website operator may use "cookies", also known as "Cookies", on users\' computers and mobile devices. This is a standard procedure common among all internet stores.',
        "The Website operator attributes supreme importance to securing customer information. All information received on the Website, whether provided by the customer or collected by Cookie during Website use, is for exclusive use of the Website (subject to customer consent to be included in the Website's mailing list).",
        "Despite the above, the Website operator will be entitled to transfer a user's personal details to a third party in cases where the user performed an act or omission that harms and/or may harm the Website operator and/or any third parties.",
        'Use of advertising and sponsored promotion technologies: The Website uses third-party technologies, including Google Ads, Facebook Pixel, Taboola, Outbrain, Mixpanel and similar services, for analyzing Website traffic, measuring campaign effectiveness and displaying personalized marketing content (remarketing). This information is collected through cookies and browsing data, and may include your IP address, pages you visited on the Website, duration of stay and actions performed. Use of these tools is carried out according to law provisions, and subject to privacy policies of external services. Any user may change their browser settings to block cookies - but this may harm the Website user experience.',
      ],
    },
  ];

  contactInfoHe = {
    address: 'רמת גן, ישראל',
    phone: '054-5674226',
    email: 'office@mentor-cards.com',
    lastUpdate: 'יולי, 2025',
  };

  contactInfoEn = {
    address: 'Ramat Gan, Israel',
    phone: '+972-54-5674226',
    email: 'office@mentor-cards.com',
    lastUpdate: 'July, 2025',
  };

  siteIntroHe = {
    title: 'תקנון, תנאי שימוש ומדיניות שינויים וביטולים לאתר מנטור-קארדס',
    copyright: 'כל הזכויות שמורות ל־Mentor Cards | ירדן סטמפו © 2025',
    welcomeText:
      'מנטור קארדס מברכים את בחירתכם לגלוש באתר האינטרנט שלנו המופעל בכתובת https://www.mentor-cards.com/ ("האתר״).',
    servicesDescription:
      'באמצעות האתר אנו מספקים מגוון רחב של שירותים – קורסים מוקלטים ללימוד (להלן: "הקורסים"), רכישת חבילות קלפים ושירותים דיגיטליים נוספים, והכל כפי שמובא בהרחבה באתר (כלל שירותים יחד, להלן: "השירותים").',
    operatorInfo:
      'האתר מופעל על ידי ירדן סטמפו ת.ז/ח.פ 032586398 (להלן: "מפעיל/ת האתר").',
  };

  siteIntroEn = {
    title: 'Terms of Use and Cancellation Policy for the Mentor Cards Website',
    copyright: 'All rights reserved to Mentor Cards | Yarden Stempo © 2025',
    welcomeText:
      'Mentor Cards welcomes you to our website at https://www.mentor-cards.com/ (the "Website").',
    servicesDescription:
      'Through this Website, we offer a wide range of services, including recorded learning courses (the "Courses"), the purchase of card sets, and other digital services (collectively referred to as the "Services"), as detailed on the Website.',
    operatorInfo:
      'The Website is operated by Yarden Stempo, ID/C.R. 032586398 (the "Site Operator").',
  };

  privacyIntroHe = {
    title: 'מדיניות פרטיות ושמירת סודיות',
    description:
      'מפעיל האתר מכבד את פרטיות המשתמשים באתר ורואה חשיבות רבה בשמירה עליה.',
    purpose:
      'מטרת מדיניות הפרטיות המובאת להלן הינה לפרט את יחס מפעיל האתר לכל נושא הפרטיות של המשתמשים באתר, לרבות המידע שמסרו המשתמשים באתר, המידע שנאסף על נוהגיהם באתר והשימוש שעושה האתר במידע זה.',
  };

  privacyIntroEn = {
    title: 'Privacy Policy and Confidentiality',
    description:
      'The Website operator respects the privacy of Website users and places great importance on maintaining it.',
    purpose:
      "The purpose of the privacy policy below is to detail the Website operator's approach to all privacy matters of Website users, including information provided by users, information collected about their behavior on the Website, and the Website's use of this information.",
  };

  constructor(
    public dialogRef: MatDialogRef<SiteRulesDialogComponent>,
    public langDirectionService: LangDirectionService
  ) {}

  ngOnInit(): void {}

  closeDialog(): void {
    this.dialogRef.close();
  }
}
