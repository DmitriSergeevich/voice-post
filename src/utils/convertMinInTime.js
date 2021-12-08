const convertMinInTime = (min)=> {
  
  const minInDur = Math.floor(+min / 60)
  const sekInminDur = minInDur * 60
  const secInDur = +min - sekInminDur
  return minInDur + ':' + secInDur
}

export default convertMinInTime;