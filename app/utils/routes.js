import api from './api';
import { TYPE_FETCHING } from './constants';

export const apiLoginUser = data =>
  api(`api/users/login`, TYPE_FETCHING.post, data);
export const apiAddUser = data =>
  api(`api/users/store`, TYPE_FETCHING.post, data);
export const apiGetUser = data => api(`api/users/${data.id}`);
export const apiGetProfiles = data =>
  api(`api/profiles`, TYPE_FETCHING.post, data);
export const apiGetUsers = data => api(`api/users`, TYPE_FETCHING.post, data);
export const apiGetAreas = data => api(`api/areas`, TYPE_FETCHING.post, data);
export const apiAddArea = data =>
  api(`api/areas/store`, TYPE_FETCHING.post, data);
export const apiAddProfile = data =>
  api(`api/profiles/store`, TYPE_FETCHING.post, data);
export const apiDeleteProfile = data =>
  api(`api/profiles/delete/${data.id}`, TYPE_FETCHING.post, data);
export const apiGetCentersCost = data =>
  api(`api/centers-cost`, TYPE_FETCHING.post, data);
export const apiAddCentersCost = data =>
  api(`api/centers-cost/store`, TYPE_FETCHING.post, data);
export const apiDeleteCentersCost = data =>
  api(`api/centers-cost/delete/${data.id}`, TYPE_FETCHING.post, data);
export const apiGetModules = data =>
  api(`api/modules`, TYPE_FETCHING.post, data);
export const apiGetDocumentTypes = data =>
  api(`api/document-types`, TYPE_FETCHING.post, data);
export const apiAddDocumentType = data =>
  api(`api/document-types/store`, TYPE_FETCHING.post, data);
export const apiDeleteDocumentType = data =>
  api(`api/document-types/delete/${data.id}`, TYPE_FETCHING.post, data);
export const apiGetDocumentBarcodes = data =>
  api(`api/document-barcodes`, TYPE_FETCHING.post, data);
export const apiAddDocumentBarcode = data =>
  api(`api/document-barcodes/store`, TYPE_FETCHING.post, data);
export const apiDeleteDocumentBarcode = data =>
  api(`api/document-barcodes/destroy/${data.id}`, TYPE_FETCHING.post, data);
export const apiAddDocument = data =>
  api(`api/documents/store`, TYPE_FETCHING.post, data, false, true);
export const apiUpdateSettings = data =>
  api(`api/user-settings/store`, TYPE_FETCHING.post, data);
export const apiGetDocumentBarcode = data =>
  api(`api/document-barcodes/edit/${data.id}`, TYPE_FETCHING.post, data);
export const apiGetDocuments = data =>
  api(`api/documents`, TYPE_FETCHING.post, data);
export const apiAddFieldsDocumentType = data =>
  api(`api/document-type-fields/store`, TYPE_FETCHING.post, data);
export const apiGetFieldsDocumentType = data =>
  api(`api/documents/create`, TYPE_FETCHING.post, data);
