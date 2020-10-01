export function getMergeSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    const auxiliaryArray = array.slice();
    mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
    return animations;
  }
  
  function mergeSortHelper(
    mainArray,
    startIdx,
    endIdx,
    auxiliaryArray,
    animations,
  ) {
    if (startIdx === endIdx) return;
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
    mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
    doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
  }
  
  function doMerge(
    mainArray,
    startIdx,
    middleIdx,
    endIdx,
    auxiliaryArray,
    animations,
  ) {
    let k = startIdx;
    let i = startIdx;
    let j = middleIdx + 1;
    while (i <= middleIdx && j <= endIdx) {
      animations.push([i, j]);
      animations.push([i, j]);
      if (auxiliaryArray[i] <= auxiliaryArray[j]) {
        animations.push([k, auxiliaryArray[i]]);
        mainArray[k++] = auxiliaryArray[i++];
      } else {
        animations.push([k, auxiliaryArray[j]]);
        mainArray[k++] = auxiliaryArray[j++];
      }
    }
    while (i <= middleIdx) {
      animations.push([i, i]);
      animations.push([i, i]);
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    }
    while (j <= endIdx) {
      animations.push([j, j]);
      animations.push([j, j]);
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }


  export function getBubbleSortAnimator(array) {
      const animations = [];
      const auxiliaryArray = array.slice();
      bubbleSortHelper(array,auxiliaryArray,animations);
      return animations;
  }

  function bubbleSortHelper(array,auxiliaryArray,animations) {
      var i,j;
      var n = array.length;
      for(i=0;i<n;i++) {
        animations.push([i,i,false,0]);
          for(j=0;j<n-i-1;j++) {
              
           
              if(auxiliaryArray[j] > auxiliaryArray[j+1]) {
                
                  var temp = auxiliaryArray[j];
                  auxiliaryArray[j] = auxiliaryArray[j+1];
                  auxiliaryArray[j+1] = temp;
                  animations.push([j, auxiliaryArray[j],true,2]);
                  animations.push([j+1,auxiliaryArray[j+1],true,2]);
                  
              }
          }
      }
  }

  export function getInsertionSortAnimator(array) {
    const animations = [];
    if (array.length <= 1) return array;
    const auxiliaryArray = array.slice();
    insertionSortHelper(array, auxiliaryArray, animations);
    return animations;
  }

  function insertionSortHelper(array, auxiliaryArray, animations) {
    var i, key, j;
    var n  = auxiliaryArray.length;  
    for (i = 1; i < n; i++) {  
        key = auxiliaryArray[i];  
        j = i - 1;  
        while (j >= 0 && auxiliaryArray[j] > key) {  
            auxiliaryArray[j + 1] = auxiliaryArray[j];
            animations.push([i,j,0]);
            animations.push([j,i,1]);
            animations.push([j+1,auxiliaryArray[j+1],2]);  
            j = j - 1;  
        }  
        auxiliaryArray[j + 1] = key;
        animations.push([j+1,key,2]);  
    } 
  }

