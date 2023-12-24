//===================== find document =====================//

export const findDocumentById = async (model, query,status)=>{
    if (!model || !query)
    return { message: "invalid arguments", sucess: false, status: 404 };
  const isDocumentExist = await model.findById(query);
  if (!isDocumentExist)
    return { message: "document not found", sucess: false, status: 404 };
  return { message: "document found", sucess: true, status: 200 };
}

//===================== create document =====================//

export const createDocument = async (model,query) =>{
    if (!model || !query)
    return { message: "invalid arguments", sucess: false, status: 404 };
    const createdDocument = await model.create(query);
    if(!createdDocument) return { message: "document not created", sucess: false, status: 400 };
    return { message: "document create sucess", sucess: true, status: 201 };
}