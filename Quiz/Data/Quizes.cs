﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;

namespace Quiz.Data;

public partial class Quizes
{
    public int Id_Quiz { get; set; }

    public int fk_User { get; set; }

    public string Name { get; set; }

    public string Description { get; set; }

    public bool Active { get; set; }

    public virtual ICollection<Questions> Questions { get; set; } = new List<Questions>();

    public virtual ICollection<RoomQuizes> RoomQuizes { get; set; } = new List<RoomQuizes>();

    public virtual ICollection<Session> Session { get; set; } = new List<Session>();

    public virtual Users fk_UserNavigation { get; set; }
}