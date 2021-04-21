
export function getJuzs() {
    let juzs = [];
    for(let x=0; x<30; x++) {
        const juz = {
            name: `Juz ${x + 1}`,
            id: `${x+1}`
        }
        juzs.push(juz)
    }

    return juzs;
}

// export function getSurahs() {
//     let surahs = [];

//     axios.get("http://api.alquran.cloud/v1/meta")
//     .then(res => {
//         const surahRef = res.data.data.surahs.references;
//         for(let x=0; x<surahRef.length; x++) {
//             const surah = {
//                 name: `${x+1}. ${surahRef[x].englishName} (${surahRef[x].name})`,
//                 id: `${x+1}`
//             }
//             surahs.push(surah);
//         }
//     })
//     .catch(err => {
//         console.log(err);
//     })

//     return surahs
// }