import { appPath } from "../Core/appPath"

export const getPhotoUrlById = (id: number) => {
    return appPath("/fotografie/detail/" + id);
}
export const getCollectionUrlById = (id: number) => {
    return appPath("/vystava/" + id);
}

export const HomepageUrl = appPath("/uvod");
export const PhotosUrl = appPath("/fotografie");
