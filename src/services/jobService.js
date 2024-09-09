import { https } from "./urlConfig";

export const jobService = {
  getListJob: (TenCongViec) => {
    let uri = `/api/cong-viec/lay-danh-sach-cong-viec-theo-ten/${TenCongViec}`;
    return https.get(uri);
  },
  getTypeJob: () => {
    let uri = "/api/loai-cong-viec";
    return https.get(uri);
  },
  getDetailTypeJob: () => {
    let uri = "/api/chi-tiet-loai-cong-viec";
    return https.get(uri);
  },
  getDetailTypeJobByID: (id) => {
    let uri = `/api/chi-tiet-loai-cong-viec/${id}`;
    return https.get(uri);
  },
  getMenuJob: () => {
    let uri = "/api/cong-viec/lay-menu-loai-cong-viec";
    return https.get(uri);
  },
  getJobWithIDTYPE: (MaChiTietLoai) => {
    let uri = `/api/cong-viec/lay-cong-viec-theo-chi-tiet-loai/${MaChiTietLoai}`;
    return https.get(uri);
  },
  postHireJob: (values) => {
    let uri = "/api/thue-cong-viec";
    return https.post(uri, values);
  },
  getListComment: (MaCongViec) => {
    let uri = `/api/binh-luan/lay-binh-luan-theo-cong-viec/${MaCongViec}`;
    return https.get(uri);
  },
  postComment: (values) => {
    let uri = "/api/binh-luan";
    return https.post(uri, values);
  },
  getListHireJobs: () => {
    let uri = "/api/thue-cong-viec/lay-danh-sach-da-thue";
    return https.get(uri);
  },
  getListJobs: () => {
    let uri = "/api/cong-viec";
    return https.get(uri);
  },
  putJob: (value, id) => {
    let uri = `/api/cong-viec/${id}`;
    return https.put(uri, value);
  },
  deleteJob: (id) => {
    let uri = `/api/cong-viec/${id}`;
    return https.delete(uri);
  },
  postJob: (values) => {
    let uri = "/api/cong-viec";
    return https.post(uri, values);
  },
  getJobWithID: (id) => {
    let uri = `/api/cong-viec/${id}`;
    return https.get(uri);
  },
  getPagination: (keyword) => {
    let uri = `/api/cong-viec/lay-cong-viec-trang`;
    return https.get(uri, keyword);
  },
  deteleHireJob: (id) => {
    let uri = `/api/thue-cong-viec/${id}`;
    return https.delete(uri);
  },
  getlistCMT: () => {
    let uri = "/api/binh-luan";
    return https.get(uri);
  },
  deleteCMT: (id) => {
    let uri = `/api/binh-luan/${id}`;
    return https.delete(uri);
  },
  putCMT: (value, id) => {
    let uri = `/api/binh-luan/${id}`;
    return https.put(uri, value);
  },
  getCMTWithID: (MaCongViec) => {
    let uri = `/api/binh-luan/lay-binh-luan-theo-cong-viec/${MaCongViec}`;
    return https.get(uri);
  },
  getHireJobs: () => {
    let uri = "/api/thue-cong-viec";
    return https.get(uri);
  },
  getDetailJobsByCodeJob: (MaCongViec) => {
    let uri = `/api/cong-viec/lay-cong-viec-chi-tiet/${MaCongViec}`;
    return https.get(uri);
  },
  postCompleted: (MaThueCongViec) => {
    let uri = `/api/thue-cong-viec/hoan-thanh-cong-viec/${MaThueCongViec}`;
    return https.post(uri);
  },
  putTypeJobbyID: (value, id) => {
    let uri = `/api/loai-cong-viec/${id}`;
    return https.put(uri, value);
  },
  postTypeJob: (value) => {
    let uri = "/api/loai-cong-viec";
    return https.post(uri, value);
  },
  postDetailTypeJobByGroup:(value)=>{
    let uri = "/api/chi-tiet-loai-cong-viec/them-nhom-chi-tiet-loai";
    return https.post(uri,value);
  },
  uploadPictureDetailType: (MaNhomLoaiCongViec, value) => {
    let uri = `/api/chi-tiet-loai-cong-viec/upload-hinh-nhom-loai-cong-viec/${MaNhomLoaiCongViec}`;
    return https.post(uri, value);
},
deleteDetailType: (id) => {
  let uri = `/api/chi-tiet-loai-cong-viec/${id}`;
  return https.delete(uri);
},
  putDetailTypeJob: (value, id) => {
    let uri = `/api/chi-tiet-loai-cong-viec/sua-nhom-chi-tiet-loai/${id}`;
    return https.put(uri, value);
  },
  deleteTypeJob: (id) => {
    let uri = `/api/loai-cong-viec/${id}`;
    return https.delete(uri);
  },
};
