using System;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace DnDApp.Models.Data
{
     interface IRepository<T>
    {
        Task<List<T>> GetAll();
        Task<T> GetById(int Id);
        Task Create(T entity);
        Task Delete(T entity);
        Task Update(T entity);
        bool Exists(int id);

    }
}
