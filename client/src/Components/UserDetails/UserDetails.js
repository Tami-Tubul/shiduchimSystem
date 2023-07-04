import "../UserDetails/UserDetails.css"
export default function UserDetails(){
// const user={
//     firstName:"מיכל",//שם פרטי
//     lastName:"כהן",//שם משפחה
//     age:null,//גיל
//     status:null,//מצב משפחתי
//     bornDate:null,//תאריך לידה
//     countryBirth:null,//ארץ לידה
//     city:null,//עיר
//     phone:null,//טלפון
//     characters:null,//תכונות אופי
//     colorSkin:null,//גוון עור
//     height:null,//גובה
//     bodyStracture:null,//מבנה גוף
//     healthCondition:null,//מצב בריאותי
//     economicCondition:null,//מצב כלכלי
//     clothingStyle:null,//סגנון לבוש
//     look:null,//מראה כללי
//     sector:null,//מגזר
//     picture:null,//תמונה
//     requireMoneyOrCommit:null,//דרישות כספיות או התחייבויות
//     yeshivaOrSeminar:null,//שם מקום לימודים
//     doingToday:null,//עיסוק כיום
//     fatherName:null,//שם האב
//     motherName:null,//שם האם
//     fatherDoing:null,//עיסוק אב
//     motherDoing:null,//עיסוק אם
//     mozaAv:null,//מוצא אב
//     mozaEm:null,//מוצא אם
//     siblings:null,//מס אחים ואחיות
//     halachaMethod:null,//שיטה הלכתית
//     drishotSector:null,//דרישות-שיוך מגזרי
//     drishotLook:null,//דרישות-מראה כללי
//     drishotCharacters:null,//דרישות-תכונות אופי
//     drishotFavoriteMoza:null,//דרישות-ארץ מוצא מועדף
//     drishotNotMoza:null,//דרישות לא ממוצאd
//     drishotHeaddress:null,//דרישות-כיסוי ראש
//     fromAge:null,//מגיל
//     mostAge:null,//עד גיל
//     fromHigh:null,//מגובה
//     mostHigh:null,//עד גובה
//     casherPhone:null,//טלפון כשר
//     licence:null,//רישיון
//     smoking:null//מעשן
//}
const UserDetails=[
    { label: 'First Name', name: 'firstName', type: 'text' },
    { label: 'Last Name', name: 'lastName', type: 'text' },
    { label: 'Age', name: 'age', type: 'number' },
    { label: 'Marital Status', name: 'status', type: 'text' },
    { label: 'Date of Birth', name: 'bornDate', type: 'date' },
    { label: 'Country of Birth', name: 'countryBirth', type: 'text' },
    { label: 'City', name: 'city', type: 'text' },
    { label: 'Phone Number', name: 'phone', type: 'number' },
    { label: 'Character Traits', name: 'characters', type: 'text' },
    { label: 'Skin Color', name: 'colorSkin', type: 'text' },
    { label: 'Height', name: 'height', type: 'text' },
    { label: 'Body Structure', name: 'bodyStracture', type: 'text' },
    { label: 'Health Condition', name: 'healthCondition', type: 'text' },
    { label: 'Economic Condition', name: 'economicCondition', type: 'text' },
    { label: 'Clothing Style', name: 'clothingStyle', type: 'text' },
    { label: 'General Appearance', name: 'look', type: 'text' },
    { label: 'Head Covering', name: 'headdress', type: 'text' },
    { label: 'Sector', name: 'sector', type: 'text' },
    { label: 'Picture', name: 'picture', type: 'text' },
    { label: 'Financial Requirements', name: 'requireMoney', type: 'text' },
    { label: 'Financial Commitments', name: 'commitMoney', type: 'text' },
    { label: 'Seminar Name', name: 'seminar', type: 'text' },
    { label: 'Current Occupation', name: 'doingToday', type: 'text' },
    { label: "Father's Name", name: 'fatherName', type: 'text' },
    { label: "Mother's Name", name: 'motherName', type: 'text' },
    { label: "Father's Occupation", name: 'fatherDoing', type: 'text' },
    { label: "Mother's Occupation", name: 'motherDoing', type: 'text' },
    { label: "Father's Origin", name: 'mozaAv', type: 'text' },
    { label: "Mother's Origin", name: 'mozaEm', type: 'text' },
    { label: 'Number of Siblings', name: 'siblings', type: 'number' },
    { label: 'Halachic Method', name: 'halachaMethod', type: 'text' },
    { label: 'Requirements - Sector', name: 'drishotSector', type: 'text' },
    { label: 'Requirements - General Appearance', name: 'drishotLook', type: 'text' },
    { label: 'Requirements - Character Traits', name: 'drishotCharacters', type: 'text' },
    { label: 'Requirements - Preferred Origin', name: 'drishotFavoriteMoza', type: 'text' },
    { label: 'Requirements - Not of Origin', name: 'drishot', type:'text'},
    { label: 'drishotNotMoza', name: 'drNotMoza', type: 'text' },
    { label: 'fromAge', name: 'frAge', type: 'text' },
    { label: 'mostAge', name: 'moAge', type: 'text' },
    { label: 'fromHigh', name: 'frHigh', type: 'text' },
    { label: 'mostHigh', name: 'moHigh', type: 'text' },
    { label: 'casherPhone', name: 'cashPhone', type: 'checkbox' },
    { label: 'licence', name: 'rishayon', type: 'checkbox' }

]
   


    return(<>
    <h1>UserDetails!!!</h1>
<div className="card">
    
    {/* <p>שם מלא: {user.firstName} {user.lastName}</p>
    <p>גיל:{user.age}</p>
    <p>{user.status}</p>
    <p>{user.height}</p>
    <p>{user.sector}</p>
    <p>{user.height}</p> 
    <p>{user.yeshivaOrSeminar}</p>
    <p>{user.city}</p>
    <p>{user.height}</p>
    <p>{user.height}</p>
    <p>{user.height}</p>
    <p>{user.height}</p>
    <p>{user.height}</p>
    <p>{user.height}</p>
    <p>{user.height}</p>
    <p>{user.height}</p>
    <p>{user.height}</p>
    <p>{user.height}</p>
    <p>{user.height}</p>
    <p>{user.height}</p>
    <p>{user.height}</p>
    <p>{user.height}</p>
    <p>{user.height}</p>
    <p>{user.height}</p>
    <p>{user.height}</p>
    <p>{user.height}</p>
    <p>{user.height}</p>
    <p>{user.height}</p>
    <p>{user.height}</p>
    <p>{user.height}</p>
    <p>{user.height}</p> */}
 <>
      <h1>UserDetails!!!</h1>
      <form>
        {UserDetails.map((question, index) => (
          <div key={index}>
            <label>{`:${UserDetails.label}`}</label>
            <br />
            <input type={UserDetails.type} />
            <br />
            <br />
          </div>
        ))}
      </form>
    </>
</div>
    </>)
}
