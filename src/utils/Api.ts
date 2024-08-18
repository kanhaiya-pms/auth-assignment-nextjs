
const API_ROOT = "https://auth-assignment-nestjs.vercel.app/"
// const API_ROOT = "http://localhost:8080/"


export class Api {

  private headers = {
    "content-type": "application/json",
  }
  constructor() {
    this.headers = {
      ...this.headers,
    }
  }

  private requests = {
    get: async (url: string) => {
      const response = await fetch(`${API_ROOT}${url}`, {
        method: "GET",
        headers: this.headers,
      });
      if (response.ok) {
        const data = await response.json();
        return data;
      }
      throw await response.json()
    },
    post: async (url: string, body: any) => {
      const response = await fetch(`${API_ROOT}${url}`, {
        method: "POST",
        headers: {
          ...this.headers,
        },
        body: JSON.stringify(body),
      });
      if (response.ok) {
        const data = await response.json();
        return data;
      }
      throw await response.json()
    },
    delete: async (url: string) => {
        const response = await fetch(`${API_ROOT}${url}`, {
          method: "DELETE",
          headers: {
            ...this.headers,
          }
        });
        if (response.ok) {
          const data = await response.json();
          return data;
        }
        throw await response.json()
      },
    patch: async (url: string, body: any) => {
      const response = await fetch(`${API_ROOT}${url}`, {
        method: 'PATCH',
        headers: {
          ...this.headers,
        },
        body: JSON.stringify(body),
      });
      if (response.ok) {
        const data = await response.json();
        return data;
      }
      throw await response.json()
    },
  };

  
  users = {
    createUser: (items: any) =>
      this.requests.post(`users/signup`, items),
    updateUser: (body: any) =>
      this.requests.patch(`users/address`, body),
    getById: (id: string) =>
      this.requests.get(`users/${id}`),
    login: (items: any) =>
      this.requests.post(`users/login`,items),
    forgetEmail: (items: any) =>
      this.requests.post(`users/forgetpass`, items),
    verifyOtp: (items: any) =>
      this.requests.post(`users/verifyotp`,items),
  }

  leads = {
    create: (id:string, items: any) =>
        this.requests.post(`leads/${id}`, items),
    getMy: (id: string) =>
        this.requests.get(`leads/my/${id}`),
    getById: (id: string) =>
      this.requests.get(`leads/${id}`),
    delete: (id: string) =>
        this.requests.delete(`leads/${id}`),
    update: (id: string, items: any) =>
        this.requests.patch(`leads/${id}`,items)
  }

}