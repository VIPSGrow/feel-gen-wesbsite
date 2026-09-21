import serverCallFuction from './constantFunction';
import type { Address, CreateAddressData, UpdateAddressData } from './types/Address';

/**
 * Address API Functions using serverCallFuction
 */

export const getAddresses = async (): Promise<{status: boolean, data?: Address[]}> => {
  return serverCallFuction('GET', 'api/ecom/addresses') as Promise<{status: boolean, data?: Address[]}>
};

export const addAddress = async (address: CreateAddressData): Promise<{status: boolean, data?: Address}> => {
  return serverCallFuction('POST', 'api/ecom/addresses', address as any) as Promise<{status: boolean, data?: Address}>
};

export const updateAddress = async (id: number, address: UpdateAddressData): Promise<{status: boolean, data?: Address}> => {
  return serverCallFuction('PUT', `api/ecom/addresses/${id}`, address as any) as Promise<{status: boolean, data?: Address}>
};

export const deleteAddress = async (id: number): Promise<{status: boolean}> => {
  return serverCallFuction('DELETE', `api/ecom/addresses/${id}`) as Promise<{status: boolean}>
};

export const setDefaultAddress = async (id: number): Promise<{status: boolean}> => {
  return serverCallFuction('PUT', `api/ecom/addresses/${id}/default`) as Promise<{status: boolean}>
};
