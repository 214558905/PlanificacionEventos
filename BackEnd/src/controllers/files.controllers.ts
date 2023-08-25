import { Request, Response } from 'express';
import fs from 'fs';
import  {google} from 'googleapis';
import File from '../models/files';
import FileEsquema from '../models/fileEsquema';
import FileFacilitador from '../models/fileFacilitador';
import { where } from 'sequelize';

const KEY_PATH = 'credentials/credentials.json';
const SCOPES = ['https://www.googleapis.com/auth/drive'];
const auth = new google.auth.GoogleAuth({
  keyFile: KEY_PATH,
  scopes: SCOPES
});
const drive = google.drive({ version: 'v3', auth });
const carpetaPropuesta = '1zuS5l7K6q93gc7fP8EDHBeaRUxZxekUF'
const carpetaEsquema = '162bjTTN9LHiSkkftuAQRLzLjtaHBvayf'
const carpetaFacilitador = '1Gk0jjQmAR0lkVWdplo0qlvEA_LXh7pvG'

export const subirArchivo= async (req: Request, res: Response) => {
  try {
    console.log(req)
    const archivoParaSubir = req.file!.path;
    const nombreArchivo = req.file!.originalname;

    const archivoMetadata = {
      name: nombreArchivo,
      parents: [carpetaPropuesta], 
    };

    const media = {
      mimeType: req.file!.mimetype,
      body: fs.createReadStream(archivoParaSubir),
    };
    
    const response = await drive.files.create({
      requestBody: archivoMetadata,
      media: media,
    });
    const id = response.data.id; 
    if(id){
      const responseG = await drive.files.get({
        fileId: id,
        fields: 'name, webContentLink',
      })
      const name =  responseG.data.name;
      const link = responseG.data.webContentLink;
      if(name && link){
        await File.create({
          fileId: id ,
          name:name,
          linkFile:link
        })
      }

    }else{
      res.status(400).json({message:"No se pudo crear"})
    }
    
    fs.unlink(archivoParaSubir, (error) => {
      if (error) {
        console.error('Error al eliminar el archivo:', error);
      } else {
        console.log('Archivo eliminado correctamente del sistema de archivos');
      }
    });

    res.status(200).json(id);
  } catch (error) {
    console.log('error al subir el archivo' , error)
    res.status(500).json({ message: 'Error al subir el archivo' });
  }

};
export const subirArchivoEs= async (req: Request, res: Response) => {
  try {
    const archivoParaSubir = req.file!.path;
    const nombreArchivo = req.file!.originalname;

    const archivoMetadata = {
      name: nombreArchivo,
      parents: [carpetaEsquema], 
    };

    const media = {
      mimeType: req.file!.mimetype,
      body: fs.createReadStream(archivoParaSubir),
    };

    const response = await drive.files.create({
      requestBody: archivoMetadata,
      media: media,
    });
    const id = response.data.id; 
    if(id){
      const responseG = await drive.files.get({
        fileId: id,
        fields: 'name, webContentLink',
      })
      const name =  responseG.data.name;
      const link = responseG.data.webContentLink;
      if(name && link){
        await FileEsquema.create({ 
          fileEsquemaId: id ,
          name:name,
          linkFile:link
        })
      }

    }else{
      res.status(400).json({message:"No se pudo crear"})
    }
    
    fs.unlink(archivoParaSubir, (error) => {
      if (error) {
        console.error('Error al eliminar el archivo:', error);
      } else {
        console.log('Archivo eliminado correctamente del sistema de archivos');
      }
    });

    res.status(200).json(id);
  } catch (error) {
    console.log('error al subir el archivo' , error)
    res.status(500).json({ message: 'Error al subir el archivo' });
  }

};
export const subirArchivoFacilitador= async (req: Request, res: Response) => {
  try {
    const archivoParaSubir = req.file!.path;
    const {idUser}=req.params
    const nombreArchivo = req.file!.originalname;

    const archivoMetadata = {
      name: nombreArchivo,
      parents: [carpetaFacilitador], 
    };

    const media = {
      mimeType: req.file!.mimetype,
      body: fs.createReadStream(archivoParaSubir),
    };

    const response = await drive.files.create({
      requestBody: archivoMetadata,
      media: media,
    });
    const id = response.data.id; 
    if(id){
      const responseG = await drive.files.get({
        fileId: id,
        fields: 'name, webContentLink',
      })
      const name =  responseG.data.name;
      const link = responseG.data.webContentLink;
      const file=await FileFacilitador.findOne({
        where:{idUser:idUser}
      })
      console.log(file)
      if(file){
        if(file.fileid){
          await drive.files.delete({fileId:file.fileid})
        }
      }
      if(name && link){
        
        await FileFacilitador.update(
          {
            fileid: id,
            name: name,
            linkFile: link
          },
          {
            where: {
              idUser: idUser
            }
          }
        );
      }

    }else{
      res.status(400).json({message:"No se pudo crear"})
    }
    
    fs.unlink(archivoParaSubir, (error) => {
      if (error) {
        console.error('Error al eliminar el archivo:', error);
      } else {
        console.log('Archivo eliminado correctamente del sistema de archivos');
      }
    });

    res.status(200).json(id);
  } catch (error) {
    console.log('error al subir el archivo' , error)
    res.status(500).json({ message: 'Error al subir el archivo' });
  }

};
export const deleteFile = async (req:Request, res:Response)=>{
  try {
    const {fileId}= req.params
    await drive.files.delete({fileId:fileId})
    res.status(200).json({message:'Archivo Eliminado'})
  } catch (error) {
    res.status(400).json({message:'No se pudo eliminar el Archivo', error})
  }
}


export const cargar= async (req: Request, res: Response) => {
  try {
    const archivoParaSubir = req.file!.path;
    const nombreArchivo = req.file!.originalname;

    const archivoMetadata = {
      name: nombreArchivo,
      parents: [carpetaFacilitador], 
    };

    const media = {
      mimeType: req.file!.mimetype,
      body: fs.createReadStream(archivoParaSubir),
    };

    const response = await drive.files.create({
      requestBody: archivoMetadata,
      media: media,
    });
    const id = response.data.id; 
    if(id){
      const responseG = await drive.files.get({
        fileId: id,
        fields: 'name, webViewLink ',
      })
      const { name, webViewLink } = responseG.data;
      const fileUrl = webViewLink?.replace('/view', '/preview');

     const responseData = {
      name,
      fileUrl,
      };
      res.status(200).json(responseData);
    }else{ 
      res.status(400).json({message:"No se pudo crear"})
    } 
    
    fs.unlink(archivoParaSubir, (error) => {
      if (error) {
        console.error('Error al eliminar el archivo:', error);
      } else {
        console.log('Archivo eliminado correctamente del sistema de archivos');
      }
    });

    res.status(200).json(id);
  } catch (error) {
    console.log('error al subir el archivo' , error)
    res.status(500).json({ message: 'Error al subir el archivo' });
  }

}; 