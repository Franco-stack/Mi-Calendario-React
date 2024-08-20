import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; // Necesario para habilitar la interacción

export default function Calendar() {
  const [events, setEvents] = useState([
    {
      id: crypto.randomUUID(), // Generar un ID único
      title: 'Evento Inicial',
      start: new Date().toISOString().slice(0, 10), // Fecha de hoy
    },
  ]);

  // Manejar la creación de eventos
  const handleDateSelect = (selectInfo) => {
    let title = prompt('Ingrese el título del evento');
    let calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // Limpiar la selección

    if (title) {
      setEvents([
        ...events,
        {
          id: crypto.randomUUID(), // Generar un ID único para cada evento
          title,
          start: selectInfo.startStr,
          end: selectInfo.endStr,
          allDay: selectInfo.allDay,
        },
      ]);
    }
  };

  // Manejar el clic en un evento para eliminarlo
  const handleEventClick = (clickInfo) => {
    if (window.confirm(`¿Está seguro de que desea eliminar el evento '${clickInfo.event.title}'?`)) {
      setEvents(events.filter(event => event.id !== clickInfo.event.id));
      clickInfo.event.remove(); // Eliminar el evento de la vista
    }
  };

  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      headerToolbar={{
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay',
      }}
      initialView="dayGridMonth"
      editable={true}
      selectable={true}
      selectMirror={true}
      events={events} // Array de eventos
      select={handleDateSelect} // Maneja la selección de fechas
      eventClick={handleEventClick} // Maneja el clic en eventos para eliminar
    />
  );
}
