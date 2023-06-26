import React from 'react'

const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

export const GetDate = (date) => {
    date = new Date(date);
    const formatDate = meses[date.getMonth()].substring(0, 3) + ' ' + date.getDate() + ', ' + date.getUTCFullYear();
    return formatDate;
}
