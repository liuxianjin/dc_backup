await query.addConstraint("PAT_SURGERY", ["ANES_TYPE_PARENT_CODE"], {
  type: "FOREIGN KEY",
  name: "fk_PAT_SURGERY_ANES_TYPE_PARENT_CODE_idx",
  references: {
    table: "SYS_DICT_ANES_TYPE",
    field: "CODE",
  },
});

await query.addConstraint("PAT_SURGERY", ["DOCTOR_DEPT_ID"], {
  type: "FOREIGN KEY",
  name: "fk_PAT_SURGERY_DOCTOR_DEPT_ID_idx",
  references: {
    table: "SYS_DEPT",
    field: "ID",
  },
});
await query.addConstraint("PAT_SURGERY", ["APPLY_DEPT_ID"], {
  type: "FOREIGN KEY",
  name: "fk_PAT_SURGERY_APPLY_DEPT_ID_idx",
  references: {
    table: "SYS_DEPT",
    field: "ID",
  },
});
