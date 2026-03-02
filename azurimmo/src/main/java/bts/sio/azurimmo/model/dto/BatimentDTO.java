package bts.sio.azurimmo.model.dto;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BatimentDTO {
	private String adresse;
    private String ville;
    private List<AppartementDTO> appartements;

}