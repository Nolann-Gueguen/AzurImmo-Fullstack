package bts.sio.azurimmo.model;

import jakarta.persistence.*;
import lombok.Data;
import com.fasterxml.jackson.annotation.JsonBackReference;

@Data
@Entity
@Table(name = "appartement")
public class Appartement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="surface")
    private Float surface;

    @Column(name="nbPiece")
    private int nbPiece;

    @Column(name="description")
    private String description;

    @Column(name="numero")
    private String numero;

    @ManyToOne
    @JoinColumn(name = "batiment_id")
    @JsonBackReference
    private Batiment batiment;
}
