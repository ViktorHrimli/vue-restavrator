export default (arr = [], size=2, type='vertical') => {
	const newArr = [];


    if (type==='vertical' || type==='v') {
        arr.forEach((item, index) => {
            const ii = (index % size);
            if (!newArr[ii]) newArr[ii] = [];
            newArr[ii].push(item);
        });
    }

    if (type==='horizontal' || type==='h') {

        let i = 0
        let arrIndex = 0
        while (i<arr.length) {
            if ((i % size)===0 && i>0) {
                arrIndex++
            }

            if (!newArr[arrIndex]) newArr[arrIndex] = []
            newArr[arrIndex].push(arr[i])

            i++
        }
    }




	return newArr;
}
